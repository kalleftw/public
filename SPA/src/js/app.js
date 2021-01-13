import { Memory } from './Memory/memory.js'
import { Window } from './Windowhandler/Windowhandler.js'
import { Tips } from './Calculator/Calculator.js'
const mem = new Memory()
mem.renderDifficulty()
const tip = new Tips()
tip.calculateTip()
const win = new Window()
win.spawnChatWindow()
win.spawnTipper()
win.spawnMemory()
win.closeWindow()
