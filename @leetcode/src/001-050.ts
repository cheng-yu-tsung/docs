//001 nums = [2,7,11,15], target = 9 =>[0,1]
function twoSum(nums: number[], target: number): number[] | void {
  let d = {};
  for (let i = 0; i < nums.length; ++i) {
    const x = nums[i];
    const y = target - x;
    if (d[y] !== undefined) {
      return [d[y], i];
    }
    d[x] = i;
  }
}
console.log("twoSum", twoSum([3, 3], 6));

//002 l1 = [2,4,3], l2 = [5,6,4]=>[7,0,8]
function addTwoNumbers() {}
