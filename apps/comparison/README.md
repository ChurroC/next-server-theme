I've tested this myself multiple times and Next Server Theme usually crushes Next Themes.
You can test this out yourself by running bun run test --filter \*comparison\*. This will have both nextServerTheme and nextTheme get the next analytics for web vitals.
Then in themeCompare run dev to see a virtual web page that shows the web vital diff.
I tried to make sure analytics only work in production since those are the only stats that really matter. But if you want to test dev just run analytics=true bun run dev
Main results are that Next Themes is almost 5x slower than Next server themes but this is for a very basic website with 4 buttons. As you scale the page and it will make a pretty big difff.
