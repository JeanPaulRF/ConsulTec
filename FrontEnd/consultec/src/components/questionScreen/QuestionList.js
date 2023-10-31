import React from 'react'
import QuestionItem from './QuestionItem'

export default function QuestionList(user, questions) {
  return (
    <div>
      {
        questions.length > 0 ? (
          <ul>
            {
              questions.map((question) => (
                <li
                  key={question.id}
                >
                  <QuestionItem
                    consulta={question.consulta}
                    IdQuestion={question.id}
                    titulo={question.titulo}
                    isResolve={question.isResolve}
                    isLinked={question.isLinked}
                    isResolvePDF={question.isResolvePDF}
                    linkRef={question.linkRef}
                    resolve={question.resolve}
                    user={question.user}
                  />
                </li>
              ))
            }
          </ul>
        ) : (<p>Buscando preguntas</p>)
      }
{/* 
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
      /> */}
    </div>
  )
}
