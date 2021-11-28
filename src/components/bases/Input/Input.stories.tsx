import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import Input from './Input';

export default {
  title: 'Input',
  component: Input,
} as Meta

const Template: Story<ComponentProps<typeof Input>> = (args) => <Input {...args} />

export const Default = Template.bind({})

Default.args = {
  defaultValue: 'Hello World',
}

export const Address = Template.bind({})

Address.args = {
  defaultValue: '12345676890ABCDEF',
  addr: true
}
