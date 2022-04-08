import createHtml from '../createHtml'
import fs from 'fs-extra'

jest.mock('fs-extra')
jest.mock('path')

describe('Node: createHtml', () => {
  it('Should create HTML', async () => {
    await createHtml('This is content', { config: { head: { raw: '' }}, page: 'somedir/somepage.md', data: {}, template: 'foo' });
    expect(fs.ensureDir).toHaveBeenCalledWith('somedir')
    expect(fs.writeFile).toHaveBeenCalledWith('somedir/somepage.html', 'foo')
  })
})
