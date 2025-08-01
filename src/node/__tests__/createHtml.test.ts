import createHtml from '../createHtml'
import * as fsExtra from 'fs-extra'

jest.mock('path')
jest.mock('fs')
jest.mock('fs-extra', () => ({
  ensureDir: jest.fn(),
  writeFile: jest.fn(),
}))

describe('Node: createHtml', () => {
  it('Should create HTML', async () => {
    await createHtml('This is content', { config: { head: { raw: '' }, outDir: ''}, page: 'somedir/somepage.md', data: {}, template: 'foo' });
    expect(fsExtra.ensureDir).toHaveBeenCalledWith('somedir')
    expect(fsExtra.writeFile).toHaveBeenCalledWith('somedir/somepage.html', 'foo')
  })
})
