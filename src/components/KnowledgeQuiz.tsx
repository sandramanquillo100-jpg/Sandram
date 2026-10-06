import React, { useState } from 'react';
import { PREGUNTAS_EVALUACION } from '../data/sstData';
import { ApprenticeInfo } from '../types/sst';
import { 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  FileCheck, 
  UserCheck, 
  ChevronRight 
} from 'lucide-react';

interface KnowledgeQuizProps {
  apprenticeInfo: ApprenticeInfo;
  currentImage?: string;
}

export const KnowledgeQuiz: React.FC<KnowledgeQuizProps> = ({ 
  apprenticeInfo, 
  currentImage = '/src/assets/images/instructor_sena_sst_1791302813723.jpg' 
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    PREGUNTAS_EVALUACION.forEach(q => {
      if (userAnswers[q.id] === q.respuestaCorrecta) {
        score += 1;
      }
    });
    return score;
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / PREGUNTAS_EVALUACION.length) * 100);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img
              src={currentImage}
              alt="Instructor SENA SST"
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-600 shadow-sm shrink-0"
            />
            <div>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                Evaluación Diagnóstica Formativa
              </span>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                Validación de Competencias en Identificación de Peligros y GTC 45
              </h2>
            </div>
          </div>
          {isSubmitted && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Intentar de nuevo</span>
            </button>
          )}
        </div>

        {/* Results Banner when Submitted */}
        {isSubmitted && (
          <div className={`p-5 rounded-xl border mb-6 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            percentage >= 80 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-700" />
                <span className="text-sm font-bold">
                  {percentage >= 80 
                    ? '¡FELICITACIONES, RESULTADO: COMPETENTE EN SST!' 
                    : 'RESULTADO: AÚN NO COMPETENTE - REQUIERE REPASO'}
                </span>
              </div>
              <p className="text-slate-700">
                Aprendiz: <strong>{apprenticeInfo.nombre || 'Aprendiz SENA'}</strong> · Aciertos: {score} de {PREGUNTAS_EVALUACION.length} ({percentage}%)
              </p>
              <p className="text-slate-600 mt-1">
                {percentage >= 80
                  ? 'Has demostrado dominio conceptual de la GTC 45, jerarquía de controles y normatividad laboral colombiana.'
                  : 'Revisa las justificaciones del instructor en cada pregunta para consolidar tus saberes.'}
              </p>
            </div>

            <div className="text-center bg-white px-4 py-3 rounded-lg border border-slate-200 shrink-0">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Puntaje Final</span>
              <span className="text-2xl font-black text-slate-900">{percentage}%</span>
            </div>
          </div>
        )}

        {/* Questions list */}
        <div className="space-y-6">
          {PREGUNTAS_EVALUACION.map((q, idx) => {
            const answeredOption = userAnswers[q.id];
            const isCorrect = answeredOption === q.respuestaCorrecta;

            return (
              <div
                key={q.id}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 text-xs"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    {idx + 1}
                  </span>
                  <p className="font-bold text-slate-900 text-sm leading-snug">
                    {q.pregunta}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {q.opciones.map((op, oIdx) => {
                    const isSelected = answeredOption === oIdx;
                    let optionStyle = 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700';

                    if (isSubmitted) {
                      if (oIdx === q.respuestaCorrecta) {
                        optionStyle = 'border-emerald-500 bg-emerald-100/70 font-semibold text-emerald-950';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'border-rose-400 bg-rose-100/70 text-rose-950';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, oIdx)}
                        className={`w-full text-left p-3 rounded-lg border transition-all text-xs flex items-center justify-between gap-3 ${optionStyle}`}
                      >
                        <span>{op}</span>
                        {isSubmitted && oIdx === q.respuestaCorrecta && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        )}
                        {isSubmitted && isSelected && !isCorrect && (
                          <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instructor feedback when submitted */}
                {isSubmitted && (
                  <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200 flex items-start gap-2.5">
                    <UserCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block mb-0.5">
                        Retroalimentación del Instructor:
                      </strong>
                      <p className="leading-relaxed text-slate-600">
                        {q.explicacionInstructor}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Has respondido {Object.keys(userAnswers).length} de {PREGUNTAS_EVALUACION.length} preguntas.
            </span>
            <button
              onClick={() => {
                if (Object.keys(userAnswers).length < PREGUNTAS_EVALUACION.length) {
                  if (!confirm('Aún tienes preguntas sin responder. ¿Deseas calificar de todas formas?')) {
                    return;
                  }
                }
                setIsSubmitted(true);
              }}
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors"
            >
              Calificar Evaluación
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
