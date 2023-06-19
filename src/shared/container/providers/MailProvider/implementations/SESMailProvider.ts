import { injectable } from "tsyringe";
import aws from 'aws-sdk';
import nodemailer, { Transporter } from 'nodemailer'
import { IMailProvider } from "../IMailProvider";
import fs from 'fs';
import handlebars from "handlebars";

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION
      })
    });

  }

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {

    const templateFileContent = fs.readFileSync(path).toString("utf-8"); // read template file
    const templateParse = handlebars.compile(templateFileContent); // parse template file from string to HTML

    const templateHTML = templateParse(variables); // parse variables to HTML

    await this.client.sendMail({
      to,
      from: "Rentx <contato@arthurdias.dev>",
      subject,
      html: templateHTML,
    });

  }
}

export { SESMailProvider }
