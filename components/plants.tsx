import React, { useRef } from 'react'
import { usePlantIDs, useFlatPlants } from '../datamodel/subscriptions'
import { randomPlant } from '../datamodel/plant'
import router from 'next/router'
import Search from './search'

export default function Plants({reflect}:any) {
  const plantIDs = usePlantIDs(reflect)
  const flatPlants = useFlatPlants(reflect)


  return (
    <div>
      <Search
        flatPlants={flatPlants}
      />
      {plantIDs && <AllPlants reflect={reflect} plantIDs={plantIDs} flatPlants={flatPlants}/>}
      <AddPlant reflect={reflect}/>
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

function Plant({plant}: any) {
  function showPlant(){
    router.push(`/p/${plant.id}`)
  }

  return (
    <div className={'px-2 text-xs'}>
    <div onClick={() => showPlant()} className={"flex flex-row justify-between"}>
      <div>{plant && plant.hawaiianName}</div>
      {/* <div>{plant && plant.createdBy}</div> */}
    </div>
    {/* <button onClick={() => reflect.mutate.deletePlant(plant.id)}>delete</button> */}
    </div>
  )
}

function AddPlant({reflect}:any) {
  const plantPropertyRef = useRef(null)

  function makePlant(){
    let randPlant = randomPlant()
    let plantHawaiianName = plantPropertyRef.current.value
    randPlant.plant.hawaiianName = plantHawaiianName
    randPlant.plant.createdBy = 'cindy'
    reflect.mutate.createPlant(randPlant)
    plantPropertyRef.current.value = ''
  }

  return (
    <div className={"p-4"}>
      <input className={"focus:outline-none"} ref={plantPropertyRef} type="text" placeholder="Hawaiian Name" />
      <button onClick={() => makePlant()}>
        Add plant
      </button>
    </div>
  )
}
