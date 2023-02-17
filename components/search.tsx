import React, { useState, useEffect } from 'react'
import router from 'next/router'
import Fuse from 'fuse.js'

export default function Search({ flatPlants }: { flatPlants : any }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([])
    } else {
      if (flatPlants) {
        const results = fuse.search(searchTerm)
        processSearchResultChange(results)
      }
    }
  }, [searchTerm])

  const debounce = (func: any, timeout = 300) => {
    let timer: any
    return (...args: any) => {
      clearTimeout(timer)
      // @ts-ignore
      timer = setTimeout(() => {func.apply(this, args)}, timeout)
    }
  }

  const processSearchResultChange = debounce((thing: any) => setSearchResults(thing))

  const options = {
    keys: [
      'createdAt',
      'createdBy',
      'clade',
      'cladeDescription',
      'family',
      'familyDescription',
      'genus',
      'species',
      'subtax',
      'subtaxName',
      'speciesCode',
      'native',
      'distribution',
      'englishName',
      'hawaiianName',
      'formerName',
      'images',
    ]
  }

  const fuse = new Fuse(flatPlants, options)

  return (
    <div>
      <SearchBox handleSetSearchTerm={setSearchTerm}/>
      {searchResults && <SearchResults searchResults={searchResults}/>}
    </div>
  )
}

function SearchBox({handleSetSearchTerm}:any){
  function doSomething(e:any){
    handleSetSearchTerm(e.target.value)
  }

  return(
    <div className={"p-4 border-2 m-2"}>
      <input className={"w-full text-xs focus:outline-none"} type="text" placeholder="search oahu plants by species, hawaiian name, whatever" onChange={(e) => doSomething(e)}/>
    </div>
  )
}

function SearchResults({searchResults}:any){
  return (
    <div className={"px-4"}>
      {searchResults.map((result:any) => {
        return <PlantSearchResult key={result.item.id} plant={result.item}/>
      })}
    </div>
  )
}

function PlantSearchResult({plant}: any) {
  function showPlant(){
    router.push(`/p/${plant.id}`)
  }

  return (
    <div onClick={() => showPlant()} className={"flex flex-row"}>
      <div>{plant.hawaiianName}</div>
      <div className={"pl-2 text-zinc-400"}>{plant.genus}</div>
      <div className={"pl-2 text-zinc-400"}>{plant.species}</div>
    </div>
  )
}


