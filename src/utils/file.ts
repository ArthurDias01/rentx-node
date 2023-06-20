import fs from 'fs'

export const deleteFile = async (filename: string) => {

  try {
    // Check if file exists
    await fs.promises.stat(filename);
  } catch {
    return;
  }

  await fs.promises.unlink(filename);
}
