import React from 'react'
import QuestionItem from './QuestionItem'

export default function QuestionList(user) {
  return (
    <div>
      <QuestionItem 
          consulta="No entineod esto"
          IdQuestion={787}
          titulo="este es el titulo"
          isResolve={true}
          isLinked={false} 
          isResolvePDF={true}
          linkRef={null}
          resolve="esta es la solución"
          user="estebanguzra@gmail.com"
      />
      <QuestionItem 
          consulta="No entineod esto"
          IdQuestion={787}
          titulo="este es el titulo"
          isResolve={false}
          isLinked={false} 
          isResolvePDF={false}
          linkRef={null}
          resolve="esta es la solución"
          user="estebanguzra@gmail.com"
      />
      <QuestionItem 
          consulta="No entineod esto"
          IdQuestion={787}
          titulo="este es el titulo"
          isResolve={true}
          isLinked={false} 
          isResolvePDF={false}
          linkRef={null}
          resolve="esta es la solución"
          user="estebanguzra@gmail.com"
      />
    </div>
  )
}
