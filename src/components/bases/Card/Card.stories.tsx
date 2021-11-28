import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import Card from './Card';

export default {
  title: 'Card',
  component: Card,
} as Meta

const Template: Story<ComponentProps<typeof Card>> = (args) => <Card {...args} />

export const Default = Template.bind({})

Default.args = {
  children: 'Card Content'
}
