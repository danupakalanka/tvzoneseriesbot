let start1 = 1
let start10 = 10
let start8 = 8

const {
	default: makeWASocket,
	useSingleFileAuthState,
	DisconnectReason,
	getContentType,
	jidDecode
} = require('@adiwajshing/baileys')
const fs = require('fs')
const P = require('pino')
const qrcode = require('qrcode-terminal')
const util = require('util')
const { state, saveState } = useSingleFileAuthState('./session.json')
const config = require('./config')
const prefix = '.'
const owner = ['94761327688']
const axios = require('axios')
const connectToWA = () => {
	const conn = makeWASocket({
		logger: P({ level: 'silent' }),
		printQRInTerminal: true,
		auth: state,
	})

	conn.ev.on('connection.update', (update) => {
		const { connection, lastDisconnect } = update
		if (connection === 'close') {
			if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
				connectToWA()
			}
		} else if (connection === 'open') {
			console.log('Bot Connected')
		}
	})

	conn.ev.on('creds.update', saveState)

	conn.ev.on('messages.upsert', async (mek) => {
		try {
			mek = mek.messages[0]
			if (!mek.message) return

			mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
			if (mek.key && mek.key.remoteJid === 'status@broadcast') return
			const type = getContentType(mek.message)
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid

			const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
			const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'listResponseMessage') && mek.message.listResponseMessage.singleSelectReply.selectedRowId ? mek.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message.buttonsResponseMessage.selectedButtonId ? mek.message.buttonsResponseMessage.selectedButtonId : (type == "templateButtonReplyMessage") && mek.message.templateButtonReplyMessage.selectedId ? mek.message.templateButtonReplyMessage.selectedId : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''


			const isCmd = body.startsWith(prefix)
			const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''

			const args = body.trim().split(/ +/).slice(1)
			const q = args.join(' ')
			const isGroup = from.endsWith('@g.us')
			const sender = mek.key.fromMe ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
			const senderNumber = sender.split('@')[0]
			const botNumber = conn.user.id.split(':')[0]
			const pushname = mek.pushName || 'Sin Nombre'

			const isMe = botNumber.includes(senderNumber)
			const isowner = owner.includes(senderNumber) || isMe

			const reply = (teks) => {
				conn.sendMessage(from, { text: teks }, { quoted: mek })
			}

			const isSUB = from == config.SENDJID ? true : false


			switch (command) {

				case 'jid': try {
					if (!from) return
					reply(from)
				}
					catch (e) {
						await conn.sendMessage(from, { text: '*Error ⛔*' }, { quoted: mek })
					}

					break

				//......................................................Commands..............................................................\\

				case 'arrow': {

					
					conn.sendMessage(from, { react: { text: config.RTYPE3, key: mek.key } })

					await conn.sendMessage(from, {
						caption: "Arrow | 2012 - 2020 | English | TV Series | Sinhala Subtitles | TV Zone | " + config.FOOTER,
						footer: config.FOOTER,
						image: { url: "https://telegra.ph/file/b045071036852fadac8a1.jpg" }
					})
					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪①' }) // Season - 1
					for (let i = 1; i <= 9; i++) {
						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E0' + filenum + '_2012_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S01E0' + filenum + ' 2012 .mkv'
						})
					} start1 = 1
					for (let i = 10; i <= 23; i++) {

						const filenum = start10++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E' + filenum + '_2013_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S01E' + filenum + ' 2013 .mkv'
						})
					} start10 = 10

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪②' }) // Season - 2
					for (let i = 1; i <= 9; i++) {

						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E0' + filenum + '_2013_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S02E0' + filenum + ' 2013 .mkv'
						})
					} start1 = 1
					for (let i = 10; i <= 23; i++) {

						const filenum = start10++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E' + filenum + '_2014_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S02E' + filenum + ' 2014 .mkv'
						})
					} start10 = 10

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪③' }) // Season - 3
					for (let i = 1; i <= 9; i++) {

						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E0' + filenum + '_2014_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S03E0' + filenum + ' 2014 .mkv'
						})
					} start1 = 1
					for (let i = 10; i <= 23; i++) {

						const filenum = start10++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E' + filenum + '_2015_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S03E' + filenum + ' 2015 .mkv'
						})
					} start10 = 10

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪④' }) // Season - 4
					for (let i = 1; i <= 9; i++) {

						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S04E0' + filenum + '_2015_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S04E0' + filenum + ' 2015 .mkv'
						})
					} start1 = 1
					for (let i = 10; i <= 23; i++) {

						const filenum = start10++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S04E' + filenum + '_2016_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S04E' + filenum + ' 2016 .mkv'
						})
					} start10 = 10

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪⑤' }) // Season - 5
					for (let i = 1; i <= 9; i++) {

						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S05E0' + filenum + '_2016_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S05E0' + filenum + ' 2016 .mkv'
						})
					} start1 = 1
					for (let i = 10; i <= 23; i++) {

						const filenum = start10++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S05E' + filenum + '_2017_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S05E' + filenum + ' 2017 .mkv'
						})
					} start10 = 10

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪⑥' }) // Season - 6
					for (let i = 1; i <= 9; i++) {

						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S06E0' + filenum + '_2017_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S06E0' + filenum + ' 2017 .mkv'
						})
					} start1 = 1
					for (let i = 10; i <= 23; i++) {

						const filenum = start10++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S06E' + filenum + '_2018_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S06E' + filenum + ' 2018 .mkv'
						})
					} start10 = 10

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪⑦' }) // Season - 7
					for (let i = 1; i <= 9; i++) {

						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S07E0' + filenum + '_2018_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S07E0' + filenum + ' 2018 .mkv'
						})
					} start1 = 1
					for (let i = 10; i <= 22; i++) {

						const filenum = start10++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S07E' + filenum + '_2019_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S07E' + filenum + ' 2019 .mkv'
						})
					} start10 = 10

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪⑧' }) // Season - 8
					for (let i = 1; i <= 7; i++) {

						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S08E0' + filenum + '_2019_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S08E0' + filenum + ' 2019 .mkv'
						})
					} start1 = 1
					for (let i = 8; i <= 9; i++) {

						const filenum = start8++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S08E0' + filenum + '_2020_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S08E' + filenum + ' 2020 .mkv'
						})
					} start8 = 8
					await conn.sendMessage(from, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S08E10_2020_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S08E10 2020 .mkv'
					})
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'deception': {

					if (!isSUB) return
					conn.sendMessage(from, { react: { text: config.RTYPE3, key: mek.key } })

					await conn.sendMessage(from, {
						caption: "Deception | 2018 | English | TV Series | Sinhala Subtitles | TV Zone | " + config.FOOTER,
						footer: config.FOOTER,
						image: { url: "https://telegra.ph/file/08e7565e65212394ae0b1.jpg" }
					})
					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪①' }) // Season - 1
					for (let i = 1; i <= 9; i++) {
						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Deception_S01E0' + filenum + '_2018_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Deception S01E0' + filenum + ' 2018 .mkv'
						})
					} start1 = 1
					for (let i = 10; i <= 13; i++) {

						const filenum = start10++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Deception_S01E' + filenum + '_2018_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Deception S01E' + filenum + ' 2018 .mkv'
						})
					} start10 = 10

					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'got': {

					if (!isSUB) return
					conn.sendMessage(from, { react: { text: config.RTYPE3, key: mek.key } })

					await conn.sendMessage(from, {
						caption: "Game Of Thrones | 2011 - 2019 | 18+ | English | TV Series | Sinhala Subtitles | TV Zone | " + config.FOOTER,
						footer: config.FOOTER,
						image: { url: "https://telegra.ph/file/5418c0b778599033406e5.jpg" }
					})
					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪①' }) // Season - 1
					for (let i = 1; i <= 9; i++) {
						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Game_Of_Thrones_S01E0' + filenum + '_2011_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Game Of Thrones S01E0' + filenum + ' 2011 18+ .mkv'
						})
					} start1 = 1
					await conn.sendMessage(from, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Game_Of_Thrones_S01E10_2011_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Game Of Thrones S01E10 2011 18+ .mkv'
					})

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪②' }) // Season - 2
					for (let i = 1; i <= 9; i++) {
						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Game_Of_Thrones_S02E0' + filenum + '_2012_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Game Of Thrones S02E0' + filenum + ' 2012 18+ .mkv'
						})
					} start1 = 1
					await conn.sendMessage(from, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Game_Of_Thrones_S02E10_2012_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Game Of Thrones S02E10 2012 18+ .mkv'
					})

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪③' }) // Season - 3
					for (let i = 1; i <= 9; i++) {
						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Game_Of_Thrones_S03E0' + filenum + '_2013_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Game Of Thrones S03E0' + filenum + ' 2013 18+ .mkv'
						})
					} start1 = 1
					await conn.sendMessage(from, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Game_Of_Thrones_S03E10_2013_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Game Of Thrones S03E10 2013 18+ .mkv'
					})

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪④' }) // Season - 4
					for (let i = 1; i <= 9; i++) {
						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Game_Of_Thrones_S04E0' + filenum + '_2014_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Game Of Thrones S04E0' + filenum + ' 2014 18+ .mkv'
						})
					} start1 = 1
					await conn.sendMessage(from, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Game_Of_Thrones_S04E10_2014_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Game Of Thrones S04E10 2014 18+ .mkv'
					})

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪⑤' }) // Season - 5
					for (let i = 1; i <= 9; i++) {
						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Game_Of_Thrones_S05E0' + filenum + '_2015_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Game Of Thrones S05E0' + filenum + ' 2015 18+ .mkv'
						})
					} start1 = 1
					await conn.sendMessage(from, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Game_Of_Thrones_S05E10_2015_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Game Of Thrones S05E10 2015 18+ .mkv'
					})

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪⑥' }) // Season - 6
					for (let i = 1; i <= 9; i++) {
						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Game_Of_Thrones_S06E0' + filenum + '_2016_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Game Of Thrones S06E0' + filenum + ' 2016 18+ .mkv'
						})
					} start1 = 1
					await conn.sendMessage(from, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Game_Of_Thrones_S06E10_2016_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Game Of Thrones S06E10 2016 18+ .mkv'
					})

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪⑦' }) // Season - 7
					for (let i = 1; i <= 7; i++) {
						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Game_Of_Thrones_S07E0' + filenum + '_2017_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Game Of Thrones S07E0' + filenum + ' 2017 18+ .mkv'
						})
					} start1 = 1

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪⑧' }) // Season - 8
					for (let i = 1; i <= 6; i++) {
						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Game_Of_Thrones_S08E0' + filenum + '_2019_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Game Of Thrones S08E0' + filenum + ' 2019 18+ .mkv'
						})
					} start1 = 1

					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'kungfupandathedragonknight': {

					if (!isSUB) return
					conn.sendMessage(from, { react: { text: config.RTYPE3, key: mek.key } })

					await conn.sendMessage(from, {
						caption: "Kung Fu Panda The Dragon Knight | 2022 | English | TV Series | Sinhala Subtitles | TV Zone | " + config.FOOTER,
						footer: config.FOOTER,
						image: { url: "https://telegra.ph/file/59c587b5ada81f6171b7f.jpg" }
					})
					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					conn.sendMessage(from, { text: '🅂🄴🄰🅂🄾🄽 ⓪①' }) // Season - 1
					for (let i = 1; i <= 9; i++) {
						const filenum = start1++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Kung_Fu_Panda_The_Dragon_Knight_S01E0' + filenum + '_2022_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Kung Fu Panda The Dragon Knight S01E0' + filenum + ' 2022 .mkv'
						})
					} start1 = 1
					for (let i = 10; i <= 11; i++) {

						const filenum = start10++

						await conn.sendMessage(from, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Kung_Fu_Panda_The_Dragon_Knight_S01E' + filenum + '_2022_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Kung Fu Panda The Dragon Knight S01E' + filenum + ' 2022 .mkv'
						})
					} start10 = 10

					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break


				default:

					if (isowner && body.startsWith('>')) {
						try {
							await reply(util.format(await eval(`(async () => {${body.slice(1)}})()`)))
						} catch (e) {
							await reply(util.format(e))
						}
					}

			}

		} catch (e) {
			const isError = String(e)

			console.log(isError)
		}
	})
}

connectToWA()
