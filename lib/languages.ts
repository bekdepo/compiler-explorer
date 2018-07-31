// Copyright (c) 2017, Matt Godbolt & Rubén Rincón
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright notice,
//       this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

export interface CELanguage_t {
    // Id of language. Added programmatically based on CELanguages key
    id?: string;
    // UI display name of the language
    name: string;
    // Monaco Editor language ID (Selects which language Monaco will use to highlight the code)
    monaco: string;
    // Usual extensions associated with the language. First one is used as file input extension for compilation/loadSave
    extensions: string[];
    // Different ways in which we can also refer to this language
    alias: string[];
    // Code example used in the initial view
    example?: string;
}
export interface CELanguages_t {[id: string]: CELanguage_t}

// Currently supported languages on Compiler Explorer
const languages: CELanguages_t = {
    'c++': {
        name: 'C++',
        monaco: 'cppp',
        extensions: ['.cpp', '.cxx', '.h', '.hpp', '.hxx', '.c'],
        alias: ['gcc', 'cpp']
    },
    llvm: {
        name: 'LLVM IR',
        monaco: 'asm',
        extensions: ['.ll'],
        alias: []
    },
    cppx: {
        name: 'Cppx',
        monaco: 'cppp',
        extensions: ['.cpp', '.cxx', '.h', '.hpp', '.hxx', '.c'],
        alias: []
    },
    c: {
        name: 'C',
        monaco: 'c',
        extensions: ['.c', '.h'],
        alias: []
    },
    rust: {
        name: 'Rust',
        monaco: 'rust',
        extensions: ['.rs'],
        alias: []
    },
    d: {
        name: 'D',
        monaco: 'd',
        extensions: ['.d'],
        alias: []
    },
    go: {
        name: 'Go',
        monaco: 'go',
        extensions: ['.go'],
        alias: []
    },
    ispc: {
        name: 'ispc',
        monaco: 'ispc',
        extensions: ['.ispc'],
        alias: []
    },
    haskell: {
        name: 'Haskell',
        monaco: 'haskell',
        extensions: ['.hs', '.haskell'],
        alias: []
    },
    swift: {
        name: 'Swift',
        monaco: 'swift',
        extensions: ['.swift'],
        alias: []
    },
    pascal: {
        name: 'Pascal',
        monaco: 'pascal',
        extensions: ['.pas'],
        alias: []
    },
    assembly: {
        name: 'Assembly',
        monaco: 'asm',
        extensions: ['.asm'],
        alias: ['asm']
    },
    analysis: {
        name: 'Analysis',
        monaco: 'asm',
        extensions: ['.asm'],  // maybe add more? Change to a unique one?
        alias: ['tool', 'tools']
    },
    cuda: {
        name: 'CUDA',
        monaco: 'cuda',
        extensions: ['.cu'],
        alias: ['nvcc']
    }
};

import * as fs from 'fs-extra';
import * as _ from 'underscore';
import * as path from 'path';

_.each(languages, (lang: CELanguage_t, key: string) => {
    lang.id = key;
    try {
        lang.example = fs.readFileSync(path.join('examples', lang.id, 'default' + lang.extensions[0]), 'utf8');
    } catch (error) {
        lang.example = "Oops, something went wrong and we could not get the default code for this language.";
    }
});

export {languages as list};