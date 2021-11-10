const navigationTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn()
  },
  ...props
})

export { navigationTestProps }
