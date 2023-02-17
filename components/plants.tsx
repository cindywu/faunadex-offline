import React, { useRef, useState } from 'react'
import { usePlantIDs, useFlatPlants } from '../datamodel/subscriptions'
import { randomPlant } from '../datamodel/plant'
import router from 'next/router'
import Search from './search'

export default function Plants({reflect}:any) {
  const plantIDs = usePlantIDs(reflect)
  const flatPlants = useFlatPlants(reflect)


  return (
    <div className={"h-screen overflow-auto"}>
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

function Plant({plant, reflect}: any) {
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
  const [showForm, setShowForm] = useState(false)

  function makePlant(){
    let randPlant = randomPlant()
    let plantHawaiianName = plantPropertyRef.current.value
    randPlant.plant.hawaiianName = plantHawaiianName
    randPlant.plant.createdBy = 'cindy'
    reflect.mutate.createPlant(randPlant)
    plantPropertyRef.current.value = ''
  }

  return (
    <div className={"absolute right-0 bottom-0 p-4"}>
      {showForm ?
        <div className={"text-sm"}>
        <input className={"focus:outline-none"} ref={plantPropertyRef} type="text" placeholder="Hawaiian Name" />
        <button onClick={() => makePlant()}>
          Add plant
        </button>
        <button onClick={() => setShowForm(!showForm)} className={'pl-2'}>&times;</button>
        </div>
      :
      <>
        <button
          className={"relative z-0 w-8 h-8 bg-black hover:bg-zinc-700"}
          onClick={() => setShowForm(!showForm)}
        >
          <div className={"absolute inset-0 flex justify-center items-center z-10 text-white"}>
            +
          </div>
        </button>
      </>
      }
    </div>
  )
}
