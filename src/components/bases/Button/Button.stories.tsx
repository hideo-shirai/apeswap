import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import Button from './Button';
import MetamaskImage from 'images/metamask.svg'

export default {
  title: 'Button',
  component: Button,
} as Meta

const Template: Story<ComponentProps<typeof Button>> = (args) => <Button {...args} />

export const Primary = Template.bind({})

Primary.args = {
  children: 'Hello World'
}

export const Secondary = Template.bind({})

Secondary.args = {
  children: 'Hello World',
  variant: 'secondary'
}

export const MetamaskButton = Template.bind({})

MetamaskButton.args = {
  variant: 'secondary',
  children: <img src={MetamaskImage} alt='img' />
}
