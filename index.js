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

				// Arrow.........................
				case 'arrow': {

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE3, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						caption: "Arrow | 2012 - 2020 | English | TV Series | Sinhala Subtitles | TV Zone | " + config.FOOTER,
						footer: config.FOOTER,
						image: { url: "https://telegra.ph/file/b045071036852fadac8a1.jpg" }
					})

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })
					conn.sendMessage(from, { text: 'arrowseason1' })

				}
					break
				case 'arrowseason1': {
					if (!isSUB) return
					conn.sendMessage(config.GROUPJID, { text: '🅂🄴🄰🅂🄾🄽 ⓪①' }) // Season - 1
					for (let i = 1; i <= 9; i++) {

						const filenum = start1++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E0' + filenum + '_2012_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S01E0' + filenum + ' 2012 .mkv'
						})
					}
					for (let i = 10; i <= 23; i++) {

						const filenum = start10++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E' + filenum + '_2013_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S01E' + filenum + ' 2013 .mkv'
						})
					}conn.sendMessage(from, { text: 'arrowseason2' })
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'arrowseason2': {
					if (!isSUB) return
					conn.sendMessage(config.GROUPJID, { text: '🅂🄴🄰🅂🄾🄽 ⓪②' }) // Season - 2
					for (let i = 1; i <= 9; i++) {

						const filenum = start1++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E0' + filenum + '_2013_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S02E0' + filenum + ' 2013 .mkv'
						})
					}
					for (let i = 10; i <= 23; i++) {

						const filenum = start10++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S02E' + filenum + '_2014_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S02E' + filenum + ' 2014 .mkv'
						})
					}conn.sendMessage(from, { text: 'arrowseason3' })
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'arrowseason3': {
					if (!isSUB) return
					conn.sendMessage(config.GROUPJID, { text: '🅂🄴🄰🅂🄾🄽 ⓪③' }) // Season - 3
					for (let i = 1; i <= 9; i++) {

						const filenum = start1++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E0' + filenum + '_2014_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S03E0' + filenum + ' 2014 .mkv'
						})
					}
					for (let i = 10; i <= 23; i++) {

						const filenum = start10++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S03E' + filenum + '_2015_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S03E' + filenum + ' 2015 .mkv'
						})
					}conn.sendMessage(from, { text: 'arrowseason4' })
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'arrowseason4': {
					if (!isSUB) return
					conn.sendMessage(config.GROUPJID, { text: '🅂🄴🄰🅂🄾🄽 ⓪④' }) // Season - 4
					for (let i = 1; i <= 9; i++) {

						const filenum = start1++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S04E0' + filenum + '_2015_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S04E0' + filenum + ' 2015 .mkv'
						})
					}
					for (let i = 10; i <= 23; i++) {

						const filenum = start10++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S04E' + filenum + '_2016_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S04E' + filenum + ' 2016 .mkv'
						})
					}conn.sendMessage(from, { text: 'arrowseason5' })
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'arrowseason5': {
					if (!isSUB) return
					conn.sendMessage(config.GROUPJID, { text: '🅂🄴🄰🅂🄾🄽 ⓪⑤' }) // Season - 5
					for (let i = 1; i <= 9; i++) {

						const filenum = start1++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S05E0' + filenum + '_2016_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S05E0' + filenum + ' 2016 .mkv'
						})
					}
					for (let i = 10; i <= 23; i++) {

						const filenum = start10++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S05E' + filenum + '_2017_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S05E' + filenum + ' 2017 .mkv'
						})
					}conn.sendMessage(from, { text: 'arrowseason6' })
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'arrowseason6': {
					if (!isSUB) return
					conn.sendMessage(config.GROUPJID, { text: '🅂🄴🄰🅂🄾🄽 ⓪⑥' }) // Season - 6
					for (let i = 1; i <= 9; i++) {

						const filenum = start1++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S06E0' + filenum + '_2017_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S06E0' + filenum + ' 2017 .mkv'
						})
					}
					for (let i = 10; i <= 23; i++) {

						const filenum = start10++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S06E' + filenum + '_2018_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S06E' + filenum + ' 2018 .mkv'
						})
					}conn.sendMessage(from, { text: 'arrowseason7' })
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'arrowseason7': {
					if (!isSUB) return
					conn.sendMessage(config.GROUPJID, { text: '🅂🄴🄰🅂🄾🄽 ⓪⑦' }) // Season - 7
					for (let i = 1; i <= 9; i++) {

						const filenum = start1++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S07E0' + filenum + '_2018_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S07E0' + filenum + ' 2018 .mkv'
						})
					}
					for (let i = 10; i <= 22; i++) {

						const filenum = start10++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S07E' + filenum + '_2019_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S07E' + filenum + ' 2019 .mkv'
						})
					}conn.sendMessage(from, { text: 'arrowseason8' })
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break

				case 'arrowseason8': {
					if (!isSUB) return
					conn.sendMessage(config.GROUPJID, { text: '🅂🄴🄰🅂🄾🄽 ⓪⑧' }) // Season - 8
					for (let i = 1; i <= 7; i++) {

						const filenum = start1++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S08E0' + filenum + '_2019_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S08E0' + filenum + ' 2019 .mkv'
						})
					}
					for (let i = 8; i <= 9; i++) {

						const filenum = start8++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S08E0' + filenum + '_2020_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S08E' + filenum + ' 2020 .mkv'
						})
					}
					await conn.sendMessage(config.GROUPJID, {
						document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S08E10_2020_@nadithpro.mkv' },
						mimetype: config.MKVTYPE,
						fileName: '@nadithpro Arrow S08E10 2020 .mkv'
					})
					conn.sendMessage(from, { react: { text: config.RTYPE2, key: mek.key } })
				}
					break



				case 'flash': {
					let start1 = 1
					let start10 = 10

					if (!isSUB) return

					conn.sendMessage(from, { react: { text: config.RTYPE3, key: mek.key } })

					await conn.sendMessage(config.GROUPJID, {
						caption: "Arrow | 2012 - 2020 | English | TV Series | Sinhala Subtitles | TV Zone | " + config.FOOTER,
						footer: config.FOOTER,
						image: { url: "https://telegra.ph/file/b045071036852fadac8a1.jpg" }
					})

					conn.sendMessage(from, { react: { text: config.RTYPE1, key: mek.key } })

					conn.sendMessage(config.GROUPJID, { text: '🅂🄴🄰🅂🄾🄽 ⓪①' }) // Season - 1

					for (let i = 1; i <= 9; i++) {

						const filenum = start1++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E0' + filenum + '_2012_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S01E0' + filenum + ' 2012 .mkv'
						})
					}
					for (let i = 10; i <= 23; i++) {

						const filenum = start10++

						await conn.sendMessage(config.GROUPJID, {
							document: { url: 'https://cloud.nadith.pro/en_tv/Arrow_S01E' + filenum + '_2013_@nadithpro.mkv' },
							mimetype: config.MKVTYPE,
							fileName: '@nadithpro Arrow S01E' + filenum + ' 2013 .mkv'
						})
					}

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
