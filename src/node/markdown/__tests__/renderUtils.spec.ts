import { renderTagAttributes } from '../renderUtils'

describe('Markdown renderUtils', () => {
  describe('renderTagAttributes', () => {
    it('Should be empty if no known attributes matched', () => {
      expect(renderTagAttributes('')).toBe('')
      expect(renderTagAttributes(' div ')).toBe('')
      expect(renderTagAttributes(' foo bar  zz ')).toBe('')
    })
    it('Should render all classes', () => {
      expect(renderTagAttributes('.class-one')).toBe(' class="class-one"')
      expect(renderTagAttributes('.class-one .class-two')).toBe(' class="class-one class-two"')
      expect(renderTagAttributes(' .class-one  .class-two')).toBe(' class="class-one class-two"')
      expect(renderTagAttributes('Foo .class-one  .class-two')).toBe(' class="class-one class-two"')
    })

    it('Should render id', () => {
      expect(renderTagAttributes('#some-id')).toBe(' id="some-id"')
    })

    it('Should render only one id (last one wins)', () => {
      expect(renderTagAttributes('#some-id #some-other-id')).toBe(' id="some-other-id"')
    })

    it('Should render combinations', () => {
      expect(renderTagAttributes('.class-one .class-two #some-id')).toBe(' id="some-id" class="class-one class-two"')
    })
  })
})
