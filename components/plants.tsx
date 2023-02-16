import React, { useRef } from 'react'
import { usePlantIDs, usePlantByID } from '../datamodel/subscriptions'
import { randomPlant } from '../datamodel/plant'

export default function Plants({reflect}:any) {
  const plantIDs = usePlantIDs(reflect)
  console.log({reflect})
  return (
    <div>
      Plants
      <AddPlant reflect={reflect}/>
      {plantIDs && <AllPlants reflect={reflect} plantIDs={plantIDs}/>}
    </div>
  )
}

function AllPlants({reflect, plantIDs} :any){
  return (
    <div>
      {plantIDs.map((plantID:string) => {
        return <Plant reflect={reflect} plantID={plantID} key={plantID}/>
      })}
    </div>
  )
}

function Plant({reflect, plantID}: any) {
  const plant = usePlantByID(reflect, plantID)
  return (
    <div>
      {plant && plant.species}
    </div>
  )
}

function AddPlant({reflect}:any) {

  const plantSpeciesRef = useRef(null)

  function makePlant(){
    let randPlant = randomPlant()
    let plantSpecies = plantSpeciesRef.current.value
    randPlant.plant.species = plantSpecies
    reflect.mutate.createPlant(randPlant)
  }

  return (
    <>
      <input ref={plantSpeciesRef} type="text" placeholder="name" />
      <button onClick={() => makePlant()}>
        add plant
      </button>
    </>
  )
}
