function tokenizer (input){
    let current = 0 // 记录当前位置
    let tokens = [] // 最终生成的tokens

    while(current < input.length){
        let char = input(current)
        // 左括号
        if(char === "("){
            tokens.push({
                type:'paren',
                value:'('
            })
            current++;
            continue;
        }
        // 右括号
        if (char === ')') {
            tokens.push({
              type: 'paren',
              value: ')',
            });
            current++;
            continue;
        }
        // 等会儿用 === " " 试试
        let WHITESPACE = /\s/
        if(WHITESPACE.test(char)){
            current++
            continue
        }
        // 检测数字
        let NUMBERS = /[0-9]/
        if(NUMBERS.test(char)){
            let value=''
            // 这里截取连续数字 不希望22 被解析成2、2
            while(NUMBERS.test(char)){
                value += char;
                char = input[++current]
            }
            tokens.push({type:'number',value})
            continue
        }
        // 检测字符串 ""
        if(char === '"'){
            let value = ''
            char = input[++current]
            while(char !== '"'){
                value += char;
                char = input[++current]
            }
            char = input[++current];
            tokens.push({type:'string,value'})
            continue
        } // 最后一个检测的是name 如add这样，也是一串连续的字符，但是他是没有“”的
        let LETTERS = /[a-z]/i;
        if (LETTERS.test(char)) {
          let value = '';
          while (LETTERS.test(char)) {
            value += char;
            char = input[++current];
          }
          tokens.push({ type: 'name', value });
          continue;
        }
        // 容错处理，如果我们什么都没有匹配到，说明这个token不在我们的解析范围内
        throw new TypeError('I dont know what this character is: ' + char);
      }
      console.log(tokens);
      return tokens
}
tokenizer(123)