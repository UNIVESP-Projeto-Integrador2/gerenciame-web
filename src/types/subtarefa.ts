import { StatusSubtarefa } from '../enums/StatusSubtarefa'

export interface Subtarefa {
  idsub_tarefa: number
  nome_subtarefa: string
  anexo_subtarefa: string
  stts_subtarefa: StatusSubtarefa
  id_tarefa: number
}
