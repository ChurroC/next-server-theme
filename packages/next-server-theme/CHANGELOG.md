# next-server-theme

## 1.5.0

### Minor Changes

-   Modified getServerTheme doesn't return "system" but instead ""
-   Now that we don't have a "system" class I now use the new themes prop to specify which classes to remove

## 1.4.2

### Patch Changes

-   Modified getServerTheme doesn't return "system" but instead undefined
-   Modified the getServerTheme to have no props to reduce confusion

## 1.4.1

### Patch Changes

-   Never published. When doing npm view next-server-theme time it says 1.4.1 was supposedly published 3 months before creation???

## 1.4.0

### Minor Changes

-   Added custom key name props

## 1.3.6

### Patch Changes

-   Reduced a render by using cookies for last value of user theming preference

## 1.3.5

### Patch Changes

-   Added nonce theming docs

## 1.3.4

### Patch Changes

-   Added resolved theming docs

## 1.3.3

### Patch Changes

-   Fixed up nonce being undefined on client if defined on server

## 1.3.2

### Patch Changes

-   Fixed up showing dark theme if theme is set system and is in resolved mode

## 1.3.1

### Patch Changes

-   Fixed up nonces if they are null or not passed as prop

## 1.3.0

### Minor Changes

-   Added nonce paramaters to script tags

## 1.2.5

### Patch Changes

-   Your boy just went crazy and reduced a rerender and solved the inital default theming causing whole background to change problem with less renders

## 1.2.4

### Patch Changes

-   Simplified code

## 1.2.3

### Patch Changes

-   Ends up having system class on inital load even with resolve on. This what usually happens since the prerender script has the class be resolved.

## 1.2.2

### Patch Changes

-   Tried to patch inital wrong render during flash

## 1.2.1

### Patch Changes

-   No hydration errors but will have default value on inital client load

## 1.2.0

### Minor Changes

-   Added a resolved feature to know what system resolved to

## 1.1.2

### Patch Changes

-   Added docs for static rendering

## 1.1.1

### Patch Changes

-   Had to unpublish 1.0.0 since I published without build

## 1.1.0

### Minor Changes

-   Added static param to opt out of dynamic rendering and output static files

## 1.0.5

### Patch Changes

-   Don't know why but previous patch didn't publish

## 1.0.4

### Patch Changes

-   Fixed SyntaxError: Unexpected token ':'

## 1.0.3

### Patch Changes

-   Reduced function calls and effect runs

## 1.0.2

### Patch Changes

-   Fixed cli color issues by forcing color to carry over into the build

## 1.0.1

### Patch Changes

-   Thought I pushed wrong build but cli was being overwritten by the test cli

## 1.0.0

### Minor Changes

-   Published package
