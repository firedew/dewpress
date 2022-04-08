export default {
  readFileSync: jest.fn().mockImplementation((file: string, options: any) => `${file}\n${options ? JSON.stringify(options) : ''}`),
  writeFile: jest.fn().mockResolvedValue(undefined),
  ensureDir: jest.fn().mockResolvedValue(undefined),
}
