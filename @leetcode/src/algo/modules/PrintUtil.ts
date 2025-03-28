/**
 * File: PrintUtil.ts
 * Created Time: 2022-12-13
 * Author: Justin (xiefahit@gmail.com)
 */

import { ListNode } from "./ListNode";
import { TreeNode, arrToTree } from "./TreeNode";

/* 打印链表 */
function printLinkedList(head: ListNode | null): void {
  const list: string[] = [];
  while (head !== null) {
    list.push(head.val.toString());
    head = head.next;
  }
  console.log(list.join(" -> "));
}

class Trunk {
  prev: Trunk | null;
  str: string;

  constructor(prev: Trunk | null, str: string) {
    this.prev = prev;
    this.str = str;
  }
}

/**
 * 打印二叉树
 * This tree printer is borrowed from TECHIE DELIGHT
 * https://www.techiedelight.com/c-program-print-binary-tree/
 */
function printTree(root: TreeNode | null) {
  printTreeHelper(root, null, false);
}

/* 打印二叉树 */
function printTreeHelper(
  root: TreeNode | null,
  prev: Trunk | null,
  isRight: boolean
) {
  if (root === null) {
    return;
  }

  let prev_str = "    ";
  const trunk = new Trunk(prev, prev_str);

  printTreeHelper(root.right, trunk, true);

  if (prev === null) {
    trunk.str = "———";
  } else if (isRight) {
    trunk.str = "/———";
    prev_str = "   |";
  } else {
    trunk.str = "\\———";
    prev.str = prev_str;
  }

  showTrunks(trunk);
  console.log(" " + root.val);

  if (prev) {
    prev.str = prev_str;
  }
  trunk.str = "   |";

  printTreeHelper(root.left, trunk, false);
}

function showTrunks(p: Trunk | null) {
  if (p === null) {
    return;
  }

  showTrunks(p.prev);
  process.stdout.write(p.str);
  // ts-node to execute, we need to install type definitions for node
  // solve: npm i --save-dev @types/node
  // restart the vscode
}

/* 打印堆 */
function printHeap(arr: number[]): void {
  console.log("堆的数组表示：");
  console.log(arr);
  console.log("堆的树状表示：");
  const root = arrToTree(arr);
  printTree(root);
}

export { printLinkedList, printTree, printHeap };
