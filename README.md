# C-Power LED
 A simple microsocket to communication with C-Power Lumen China via TCP

Credits to microsocket/CP5200 https://github.com/microsocket/CP5200.git (page not found)

# Parameters
```json
{
    "ip" : "192.168.0.0",
    "type" : "0/1",
    "text" : "test",
    "stayTime" : "[0-99]"
}
```
1. IP - your local IP
2. type - types of effects 
    1. textData - static text display on LED and wont goes off till restart LED
    2. instantMessage - timing text display based on the "stayTime"
3. text - any string
4. stayTime - only for instantMessage [0-99]

# MIT license

Copyright (c) 2020 Alvin Lai alvin30595@hotmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
