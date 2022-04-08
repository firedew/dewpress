export default {
  join: jest.fn().mockImplementation((...args) => [...args].join('')),
  dirname: jest.fn().mockImplementation((path: string) => path.split('/').slice(0,-1).join('/') || './'),
}
