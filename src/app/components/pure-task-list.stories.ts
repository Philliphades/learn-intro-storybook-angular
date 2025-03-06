import type { Meta, StoryObj } from '@storybook/angular';

import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

import { CommonModule } from '@angular/common';

import PureTaskListComponent from './pure-task-list.component';
import TaskComponent from './task.component';

import * as TaskStories from './task.stories';

const meta: Meta<PureTaskListComponent> = {
  component: PureTaskListComponent, // Gán component chính để Storybook hiển thị
  title: 'PureTaskList', // Tiêu đề hiển thị trong Storybook sidebar
  tags: ['autodocs'], // Tự động tạo tài liệu cho component
  decorators: [
    moduleMetadata({
      //👇 Imports both components to allow component composition with Storybook
      declarations: [PureTaskListComponent, TaskComponent], // Các component liên quan
      imports: [CommonModule], // Các module cần thiết để component hoạt động
    }),
    //👇 Wraps our stories with a decorator
    componentWrapperDecorator(
      (story) => `<div style="margin: 3em">${story}</div>`
    ),
  ],
  args: {
    ...TaskStories.ActionsData,
  },
};
/**
 * cấu hình mặc định (meta) cho TaskListComponent trong Storybook
 * meta chứa thông tin chung về component, bao gồm:
 * - component: Xác định component nào sẽ được hiển thị trong Storybook.
 * - title: Định danh component trong sidebar của Storybook.
 * - decorators: Định nghĩa các cài đặt bổ sung, như moduleMetadata và componentWrapperDecorator.
 * - args: Giá trị mặc định cho component.
 */
export default meta;
type Story = StoryObj<PureTaskListComponent>; //kiểu dữ liệu của mỗi Story và kiểm tra lỗi TypeScript.

export const Default: Story = {
  args: {
    tasks: [
      { ...TaskStories.Default.args?.task, id: '1', title: 'Task 1' },
      { ...TaskStories.Default.args?.task, id: '2', title: 'Task 2' },
      { ...TaskStories.Default.args?.task, id: '3', title: 'Task 3' },
      { ...TaskStories.Default.args?.task, id: '4', title: 'Task 4' },
      { ...TaskStories.Default.args?.task, id: '5', title: 'Task 5' },
      { ...TaskStories.Default.args?.task, id: '6', title: 'Task 6' },
    ],
  },
};

export const WithPinnedTasks: Story = {
  args: {
    tasks: [
      // Shaping the stories through args composition.
      // Inherited data coming from the Default story.
      ...(Default.args?.tasks?.slice(0, 5) || []),
      { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
    ],
  },
};

export const Loading: Story = {
  args: {
    tasks: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    // Shaping the stories through args composition.
    // Inherited data coming from the Loading story.
    ...Loading.args,
    loading: false,
  },
};
