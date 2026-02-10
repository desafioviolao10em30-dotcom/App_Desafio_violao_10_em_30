import React from 'react';
import { Lock, Unlock, Music, Calendar, Users, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ExpressModule({ isLocked }) {
  if (isLocked) {
    return (
      <div className="bg-purple-800/30 backdrop-blur-sm rounded-2xl border-2 border-yellow-500/50 overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-yellow-400" />
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-yellow-400 mb-3">
            Grupo Violão Express 26 por 100
          </h2>

          <p className="text-purple-200 mb-6 max-w-lg mx-auto">
            Complete todos os módulos do "Desafio Violão 10 em 30" para desbloquear este conteúdo exclusivo!
          </p>

          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-purple-900/50 rounded-xl p-4 border border-purple-700">
              <Calendar className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold">26 Semanas</p>
              <p className="text-purple-300 text-sm">de conteúdo</p>
            </div>
            <div className="bg-purple-900/50 rounded-xl p-4 border border-purple-700">
              <Music className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold">100 Músicas</p>
              <p className="text-purple-300 text-sm">3+ músicas por semana</p>
            </div>
            <div className="bg-purple-900/50 rounded-xl p-4 border border-purple-700">
              <Users className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Comunidade</p>
              <p className="text-purple-300 text-sm">exclusiva</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-yellow-500/10 to-green-500/10 backdrop-blur-sm rounded-2xl border-2 border-green-500/50 overflow-hidden">
      <div className="p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center mx-auto mb-4">
          <Unlock className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-yellow-400">
          Grupo Violão Express 26 por 100
        </h2>

        <p className="text-green-400 font-semibold flex items-center justify-center gap-2 mt-2">
          <CheckCircle className="w-4 h-4" />
          Desbloqueado!
        </p>

        <p className="text-purple-200 mt-4 max-w-2xl mx-auto">
          Parabéns! Você liberou o Express.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <a href="https://seu-link-express-conteudo.com" target="_blank" rel="noreferrer">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-6 text-lg rounded-xl">
              <Music className="w-5 h-5 mr-2" />
              Acessar Conteúdo
            </Button>
          </a>

          <a href="https://seu-link-express-comunidade.com" target="_blank" rel="noreferrer">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 text-purple-900 px-8 py-6 text-lg rounded-xl">
              <Users className="w-5 h-5 mr-2" />
              Comunidade Express
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
