import React, { FC, useState, useEffect, useCallback, useRef, useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { ReactSortable } from 'react-sortablejs'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { StreamLanguage, LanguageSupport } from '@codemirror/language'
import { ViewUpdate } from '@codemirror/view'
import { yaml } from '@codemirror/legacy-modes/mode/yaml'
import { stringify as stringifyYAML, parse as parseYAML } from 'yaml'
import { Component, ComponentContainer, IComponent } from '@/app/$lib/composer/domain/component'
import { ComponentAPI } from '@/app/$lib/composer/controller/ComponentAPI'
import Factory from './view/ComponentFactory'


const initialValue = `[
    {
        id: 'A',
        name: 'foo',
        value: 'bar'
    },
    {
        id: 'B',
        name: 'something',
        value: 5
    },
    {
        id: 'C',
        content: 'this is some content'
    },
    {
        id: 'D',
        custom: 'field'
    }
]`

const yamlLanguage = new LanguageSupport(StreamLanguage.define(yaml));

const componentAPI: ComponentAPI = ComponentAPI.getInstance();

const yamlToComponents: (input: string) => ComponentContainer = (input) => {
    const yamlItems = parseYAML(input);
    const components: ComponentContainer = new ComponentContainer();
    yamlItems.forEach((it: any) => components.push(IComponent.factory(it, components)));
    return components;
}

const Composer: FC = () => {
    const timer: any = useRef(null);
    const [ state, setState ] = useState<Component[]>([ ]);

    const triggerUpdate = () => {
        setState(prevState => {
            // console.log(prevState)
            return [...prevState]
        })
    }

    const composerAPI = useMemo(() => {
        return {
            componentAPI,
            triggerUpdate
        }
    }, [])
    
    useEffect(() => {
        setState(yamlToComponents(initialValue))
    }, []);

    const onChange = useCallback((value: string, _: ViewUpdate) => {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }

        timer.current = setTimeout(() => {
            setState(yamlToComponents(value))
        }, 500)
    }, []);

    return (
        <div className="flex h-full">
            <div className="w-1/2">
                <CodeMirror
                    theme={vscodeDark}
                    value={stringifyYAML(state)}
                    height="100vh"
                    extensions={[ yamlLanguage ]}
                    onChange={onChange}
                />
            </div>
            <div className="bg-gray-200 w-1/2">
                <ReactSortable 
                    animation={200} 
                    list={state} 
                    setList={setState} 
                    className="p-4 grid grid-cols-1 gap-1">
                    {state.map((item) => (
                        <Factory 
                            key={item.uuid} 
                            component={item} 
                            composerAPI={composerAPI} />
                    ))}
                </ReactSortable>
            </div>
        </div>
    );
};

export default Composer