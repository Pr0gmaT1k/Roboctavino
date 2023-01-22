/**
 * Constants.gs
 * Roboctavino
 *
 * Created by Pr0gmaT1k on 13/01/2023
 * Copyright (C) 2023  Octava Compañia de Bomberos de Valparaíso
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


// TWITTER
let CENTRAL_ACCOUNT = ''
let STATION_ACCOUNT = ''
let CONSUMER_KEY = '';
let CONSUMER_SECRET = '';
let TOKEN = '';
let TOKEN_SECRET = '';
var service;

// SLIDES
let SLIDE_ID = ""
let UNIT_SHAPE_ID = ''
let KEY_SHAPE_ID = ''
let ADRESS_SHAPE_ID = ''
let SOCIAL_SHAPE_ID = ''
let MAP_IMAGE_ID = ''
let UNIT_IMAGE_ID = ''

// GOOGLE DRIVE
let IMAGE_81 = DriveApp.getFileById('')
let IMAGE_82 = DriveApp.getFileById('')
let IMAGE_EMPTY_TRANSPARENT = DriveApp.getFileById('')
let IMAGE_81_82 = IMAGE_82

// CBV KEYS
let emergencyKeysTable = {
  'CLAVE 1-1': ['a un incendio estructural simple', '#d50000', 'Incendio estructural simple', '#Bomberos #Valparaíso #Incendio'],
  'CLAVE 1-2': ['a un incendio estructural complejo', '#d50000', 'Incendio estructural complejo', '#Bomberos #Valparaíso #Incendio'],
  'CLAVE 1-3': ['a un incendio estructural en altura', '#d50000', 'Incendio estructural en altura', '#Bomberos #Valparaíso #Incendio'],
  'CLAVE 1-4': ['a un incendio estructural con afluencia de público', '#d50000', 'Incendio estructural con afluencia de público', '#Bomberos #Valparaíso #Incendio'],
  'CLAVE 2-1': ['a un incendio forestal de interfase', '#ff3d00', 'Incendio forestal de interfase', '#Bomberos #Valparaíso #Incendio'],
  'CLAVE 2-2': ['a un incendio forestal', '#ff3d00', 'Incendio forestal', '#Bomberos #Valparaíso #Incendio'],
  'CLAVE 2-3': ['a un incendio en escombros o basura', '#ff3d00', 'Incendio en escombros o basura', '#Bomberos #Valparaíso #Incendio'],
  'CLAVE 3-1': ['a un incendio vehicular menor', '#6200ea', 'Incendio vehicular menor', '#Bomberos #Valparaíso #Incendio'],
  'CLAVE 3-2': ['a un incendio vehicular mayor', '#6200ea', 'Incendio vehicular mayor', '#Bomberos #Valparaíso #Incendio'],
  'CLAVE 3-3': ['a un incendio vehicular complejo', '#6200ea', 'Incendio vehicular complejo', '#Bomberos #Valparaíso #Incendio'],
  'CLAVE 4-1': ['a una emergencia con gases combustibles simple', '#aa00ff', 'Emergencia con gases combustibles simple', '#Bomberos #Valparaíso #Gas'],
  'CLAVE 4-2': ['a una emergencia con gases combustibles intermedio', '#aa00ff', 'Emergencia con gases combustibles intermedio', '#Bomberos #Valparaíso #Gas'],
  'CLAVE 4-3': ['a una emergencia con gases combustibles complejos', '#aa00ff', 'Emergencia con gases combustibles complejos', '#Bomberos #Valparaíso #Gas'],
  'CLAVE 4-4': ['a una emergencia con materiales peligrosos', '#aa00ff', 'Emergencia con materiales peligrosos', '#Bomberos #Valparaíso #HazMat'],
  'CLAVE 5-1': ['a un rescate vehicular simple', '#304ffe', 'Rescate vehicular simple', '#Bomberos #Valparaíso #AccidenteDeTránsito'],
  'CLAVE 5-2': ['a un rescate vehicular complejo', '#304ffe', 'Rescate vehicular complejo', '#Bomberos #Valparaíso #AccidenteDeTránsito'],
  'CLAVE 5-2': ['a un rescate vehicular en túnel', '#304ffe', 'Rescate vehicular en túnel', '#Bomberos #Valparaíso #AccidenteDeTránsito'],
  'CLAVE 6-1': ['a un rescate', '#00c853', 'Rescate', '#Bomberos #Valparaíso #Rescate'],
  'CLAVE 6-2': ['a un rescate en desnivel', '#00c853', 'Rescate en desnivel', '#Bomberos #Valparaíso #Rescate'],
  'CLAVE 6-3': ['a un rescate en altura', '#00c853', 'Rescate en altura', '#Bomberos #Valparaíso #Rescate'],
  'CLAVE 6-4': ['a un rescate en espacios confinados', '#00c853', 'Rescate en espacios confinados', '#Bomberos #Valparaíso #Rescate'],
  'CLAVE 6-4': ['a un rescate agreste', '#00c853', 'Rescate agreste', '#Bomberos #Valparaíso #Rescate'],
  'CLAVE 6-5': ['a una búsqueda en áreas agrestes / abiertas', '#00c853', 'Búsqueda en áreas agrestes / abiertas', '#Bomberos #Valparaíso #Rescate'],
  'CLAVE 7': ['a acuartelamiento general', '#00bfa5', 'Acuartelamiento general', '#Bomberos #Valparaíso #Acuartelamiento'],
  'CLAVE 7-1': ['a acuartelamiento a compañias de especialidad', '#00bfa5', 'Acuartelamiento a compañias de especialidad', '#Bomberos #Valparaíso #Acuartelamiento'],
  'CLAVE 7-2': ['a acuartelamiento a grupo y/o equipo de especialidad', '#00bfa5', 'Acuartelamiento a grupo y/o equipo de especialidad', '#Bomberos #Valparaíso #Acuartelamiento'],
  'CLAVE 8': ['a apoyo a otros cuerpos de bomberos', '#795548', 'Apoyo a otros cuerpos de bomberos'],
  'CLAVE 9-1': ['a un incendio industrial', '#0288d1', 'Incendio industrial', '#Bomberos #Valparaíso #Incendio'],
  'CLAVE 9-2': ['a un incidente con multiplicidad de personas lesionadas', '#0288d1', 'Incidente con multiplicidad de personas lesionadas', '#Bomberos #Valparaíso'],
  'CLAVE 9-3': ['a un incidente aero', '#0288d1', 'Incidente aero', '#Bomberos #Valparaíso'],
  'CLAVE 9-4': ['a un incidente ferroviario', '#0288d1', 'Incidente ferroviario', '#Bomberos #Valparaíso'],
  'CLAVE 9-5': ['a un incendio en vertedero o relleno sanitario', '#0288d1', 'Incendio en vertedero o relleno sanitario', '#Bomberos #Valparaíso #Incendio'],
  'CLAVE 10': ['a un incidente electrico', '#aeea00', 'Incidente electrico', '#Bomberos #Valparaíso'],
  'CLAVE 11': ['a un incidente no categorizado', '#aeea00', 'Incidente no categorizado', '#Bomberos #Valparaíso'],
  'CLAVE 12': ['a otros servicios', '#546e7a', 'Otros servicios', '#Bomberos #Valparaíso'],
  'CLAVE 13': ['a un rebrote de incendio', '#aeea00', 'Rebrote de incendio', '#Bomberos #Valparaíso #Incendio'],
  'CLAVE 14': ['a un simulacro de incidente', '#ffd600', 'Simulacro de incidente', '#Bomberos #Valparaíso #Simulacro'],
  'CLAVE 15': ['a una citacion cbv', '#263238', 'Citacion CBV', '#Bomberos #Valparaíso']
}
