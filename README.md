# React Dynamic Input Width

Dynamically update the input width based on the input value length

## Getting Started

```
npm i @jimsheen/react-dynamic-input-width
yarn add @jimsheen/react-dynamic-input-width
```


## Example

```
import React from 'react';
import Input from 'react-dynamic-input-width';

const InputExample = () => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
  }

  return (
    <Input
      initialValue="Hello there"
      padding={10}
      initialWidth={100}
      onChange={(e) => handleChange(e)}
      onKeyPress={(e) => handleKeyPress(e)}
    />
  )
}

```
It's also possible to pass additional props to the underlying input component such as "placeholder" for example

```
<Input
  placeholder="Placeholder text"
/>
```

## Props

```
initialValue?: string
initialWidth?: number
padding?: number
fontSize?: string
onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
className?: string
```

