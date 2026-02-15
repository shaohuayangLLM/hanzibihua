/**
 * 测试例句关系和结构关系功能
 *
 * 运行方式：在浏览器控制台中粘贴此代码
 */

// 测试例句关系
console.log('=== 测试例句关系 ===');
const testChars = ['你', '我', '他', '天', '地'];

testChars.forEach(char => {
  const relations = window.getCharacterRelations?.(char);
  if (relations) {
    console.log(`\n${char}字的例句关系 (${relations.inSentences.length} 个):`);
    relations.inSentences.slice(0, 3).forEach(rel => {
      console.log(`  - ${rel.targetCharacter} (${rel.description})`);
    });
  }
});

// 测试结构关系
console.log('\n\n=== 测试结构关系 ===');
testChars.forEach(char => {
  const relations = window.getCharacterRelations?.(char);
  if (relations) {
    console.log(`\n${char}字的结构关系 (${relations.sameStructure.length} 个):`);
    relations.sameStructure.slice(0, 5).forEach(rel => {
      console.log(`  - ${rel.targetCharacter} (${rel.description})`);
    });
  }
});

console.log('\n\n测试完成！');
console.log('如果看到上面的输出，说明功能正常工作。');
