# React Dynamic Input Width

Dynamically update the input width based on the input value length

[![npm package](https://img.shields.io/badge/npm%20i-@jimsheen/react--dynamic--input--width-brightgreen)](https://www.npmjs.com/package/@jimsheen/react-dynamic-input-width) [![version number](https://img.shields.io/npm/v/@jimsheen/react-dynamic-input-width?color=green&label=version)](https://github.com/jimsheen/react-dynamic-input-width/releases) [![Actions Status](https://github.com/jimsheen/react-dynamic-input-width/workflows/Test/badge.svg)](https://github.com/jimsheen/react-dynamic-input-width/actions) [![License](https://img.shields.io/github/license/jimsheen/react-dynamic-input-width)](https://github.com/jimsheen/react-dynamic-input-width/blob/main/LICENSE)

## Getting Started

```
npm install @jimsheen/react-dynamic-input-width
```


## Examples

Basic example

```
import React from 'react';
import Input from '@jimsheen/react-dynamic-input-width';

export default function InputExample() {

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

Full example using refs:

```
import React, { useEffect } from "react";
import Input from "@jimsheen/react-dynamic-input-width";

export default function InputExample() {
  const [isEdit, setIsEdit] = React.useState(false);
  const [value, setValue] = React.useState("Hello there");

  // create a ref for the value span
  const valueRef = React.useRef<HTMLSpanElement>(null);
  
  // create a ref for the input
  const inputRef = React.useRef<HTMLInputElement>(null);

  // update value when input is changed
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  // example of handling "Enter" key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e && e.key === "Enter") || !e) {
      setIsEdit(!isEdit);
    }
  };

  // toggle the input visibility
  const handleClick = () => {
    setIsEdit(!isEdit);
  };

  // focus the input when isEdit is true
  useEffect(() => {
    if (isEdit) inputRef.current?.focus();
  }, [isEdit]);

  return (
    <>
      <button onClick={handleClick}>Toggle Edit</button>
      {!isEdit && <span ref={valueRef}>{value}</span>}
      {isEdit && (
        <Input
          initialValue={value}
          padding={0}
          // set initialWidth to the width of the value span element
          initialWidth={valueRef.current?.offsetWidth}
          onChange={(e) => handleChange(e)}
          onKeyPress={(e) => handleKeyPress(e)}
          ref={inputRef}
        />
      )}
    </>
  );
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

## Props

| Prop         	| Type   	| Default             	| Required 	| Description                                                     	|
|--------------	|--------	|---------------------	|----------	|-----------------------------------------------------------------	|
| initialValue 	| string 	| undefined           	| false    	| The input's initial value                                       	|
| initialWidth 	| number 	| undefined           	| false    	| The input's initial width value in `px`                         	|
| padding      	| number 	| 1                   	| false    	| Add's extra width to the input                                  	|
| fontSize     	| string 	| 16px                	| false    	| The font size of the input (used for measuring the offsetWidth) 	|
| className    	| string 	| input-dynamic-width 	| false    	| Default className                                               	|

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

- [Basic Example](https://codesandbox.io/s/basic-example-b6pk7)
- [Toggle Input Visibility Example](https://codesandbox.io/s/full-example-mrghy)

