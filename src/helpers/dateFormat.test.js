import dateFormat from './dateFormat'

describe('Test Date Format', () => {
  it('retrieves a helper', () => {
    const response = dateFormat('1/1/2006')

    expect(response).toBe('2006-1-1')
  })
})
