const math = require('mathjs')

module.exports = {
    name: 'math',
    description: 'Solves a given math equation.',
    execute(message, args) {
        try{
            var answer = math.evaluate(args)
            message.reply('The answer is ' + answer + '.')
        }
        catch(err){
            message.reply('You have to give me an actual math equation. You can not use spaces. Note that multiplication is `*` instead of `x`.')
        }
    }
}