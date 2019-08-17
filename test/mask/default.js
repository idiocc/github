import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import github from '../../src'

// export default
makeTestSuite('test/result', {
  async getResults(input) {
    const res = await github({
      text: input,
    })
    return res
  },
  context: Context,
})