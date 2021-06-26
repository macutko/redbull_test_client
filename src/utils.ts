import { useEffect, useState } from "react";
import content from './content.json';

export function shuffle(array: IContent[]) {

    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export interface IContent {
    id: string,
    mediaType: string,
    source: string,
    title: string,
    description?: string,
    length?: string,
    aspectRatio?: string,
    topic?: string,
    contentUrl: string,
    previewUrl: string
}


export function getAllContentIds() {
    const newContent = content.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
    return newContent.map((item: IContent) => {
        return {
            params: {
                id: item.id
            }
        }
    })

}


export function getContentData(id: string) {
    const r = content.filter(obj => {
        return obj.id === id
    })
    return r[0]
}

export function getUniqueContent(): IContent[] {
    const newContent = content.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
    let ids = []
    for (let i = 0; i < newContent.length; i++) {
        ids.push(content.indexOf(newContent[i]))
    }

    return ids.map((item) => content[item])
}


export const useLoaded = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => setLoaded(true), []);
    return loaded;
};