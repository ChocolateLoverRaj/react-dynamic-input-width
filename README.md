# React Dynamic Input Width

Dynamically update the input width based on the input value length

[![npm package](https://img.shields.io/badge/npm%20i-@jimsheen/react--dynamic--input--width-brightgreen)](https://www.npmjs.com/package/@jimsheen/react-dynamic-input-width) [![version number](https://img.shields.io/npm/v/@jimsheen/react-dynamic-input-width?color=green&label=version)](https://github.com/jimsheen/react-dynamic-input-width/releases) [![Actions Status](https://github.com/jimsheen/react-dynamic-input-width/workflows/Test/badge.svg)](https://github.com/jimsheen/react-dynamic-input-width/actions) [![License](https://img.shields.io/github/license/jimsheen/react-dynamic-input-width)](https://github.com/jimsheen/react-dynamic-input-width/blob/main/LICENSE)

## Getting Started

```
npm i @jimsheen/react-dynamic-input-width
yarn add @jimsheen/react-dynamic-input-width
```


## Example


```
import React from 'react';
import Input from '@jimsheen/react-dynamic-input-width';

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

### refs

Input accepts a ref by utilising the forwardRef HOC under the hood

```
const inputRef = React.useRef<HTMLInputElement>(null)

<Input
  ref={inputRef}
/>
```

### other props

It's also possible to pass additional props to the underlying input component such as "placeholder" for example

```
<Input
  placeholder="Placeholder text"
/>
```

## Types

```
initialValue?: string
initialWidth?: number
padding?: number
fontSize?: string
onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
className?: string
```

## Demo

- [Basic Example](https://codesandbox.io/s/jimsheen-react-dynamic-input-width-example-1-b6pk7)
- [Toggle Input Visibility Example]()

