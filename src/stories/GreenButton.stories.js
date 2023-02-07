import GreenButton from "../components/buttons/GreenButton";

export default {
  title: "Buttons/Main Button",
  component: GreenButton,
};

const Template = (args) => <GreenButton {...args}>Button</GreenButton>;

export const Contained = Template.bind({});
Contained.args = {
  variant: "contained",
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: "outlined",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
};
