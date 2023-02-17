import React, { useRef, useState, useEffect } from 'react'
import { usePlantIDs, usePlantByID, useAllPlants, useFlatPlants } from '../datamodel/subscriptions'
import { randomPlant } from '../datamodel/plant'
import Fuse from 'fuse.js'
import { consoleLogSink } from '@rocicorp/logger'
import router from 'next/router'

export default function Plants({reflect}:any) {
  const plantIDs = usePlantIDs(reflect)
  const flatPlants = useFlatPlants(reflect)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])

  console.log({reflect})
  console.log({flatPlants})

  useEffect(() => {
    console.log('searchTerm', searchTerm)
    if (searchTerm?.length > 0) {
      if (flatPlants) {
        const results = fuse.search(searchTerm)
        processSearchResultChange(results)
      }
    } else {
      setSearchResults([])
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
      <Search handleSetSearchTerm={setSearchTerm}/>
      {searchResults && <SearchResults searchResults={searchResults}/>}
      <AddPlant reflect={reflect}/>
      {plantIDs && <AllPlants reflect={reflect} plantIDs={plantIDs} flatPlants={flatPlants}/>}
    </div>
  )
}

function SearchResults({searchResults}:any){
  return (
    <div className={"px-4"}>
      {searchResults.map((result:any) => {
        return <Plant key={result.item.id} plant={result.item}/>
      })}
    </div>
  )
}

function Search({handleSetSearchTerm}:any){
  function doSomething(e:any){
    handleSetSearchTerm(e.target.value)
  }

  return(
    <div className={"p-4 border-2 m-2"}>
      <input className={"w-full text-xs focus:outline-none"} type="text" placeholder="search oahu plants by species, hawaiian name, whatever" onChange={(e) => doSomething(e)}/>
    </div>
  )
}
function AllPlants({reflect, plantIDs, flatPlants} :any){
  return (
    <div className={"p-2"}>
      {flatPlants.map((plant:any) => {
        return <Plant reflect={reflect} plant={plant} key={plant.id}/>
      })}
    </div>
  )
}

function Plant({reflect, plant}: any) {
  // const plant = usePlantByID(reflect, plantID)
  function showPlant(){
    console.log('show plant')
    router.push(`/p/${plant.id}`)
  }
  // route to /p/[id]

  return (
    <div>
    <div onClick={() => showPlant()} className={"flex flex-row justify-between"}>
      <div>{plant && plant.hawaiianName}</div>
      <div>{plant && plant.createdBy}</div>
    </div>
    {/* <button onClick={() => reflect.mutate.deletePlant(plant.id)}>delete</button> */}
    </div>
  )
}

function AddPlant({reflect}:any) {

  const plantHawaiianNameRef = useRef(null)

  function makePlant(){
    let randPlant = randomPlant()
    let plantHawaiianName = plantHawaiianNameRef.current.value
    randPlant.plant.hawaiianName = plantHawaiianName
    randPlant.plant.createdBy = 'cindy'
    reflect.mutate.createPlant(randPlant)
    plantHawaiianNameRef.current.value = ''
  }

  return (
    <div className={"p-4"}>
      <input className={"focus:outline-none"} ref={plantHawaiianNameRef} type="text" placeholder="Hawaiian Name" />
      <button onClick={() => makePlant()}>
        Add plant
      </button>
    </div>
  )
}
