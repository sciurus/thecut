import json,html,subprocess
from pathlib import Path
catalog=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import ts from 'typescript'; import {readFileSync} from 'node:fs'; const source=readFileSync('src/data/haircuts.ts','utf8'); const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText; const data=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64')); console.log(JSON.stringify(data.haircuts));"],text=True))
base='Clean two-dimensional vector-style editorial portrait. Same early-teen boy, medium warm-brown skin, neutral friendly expression, three-quarter view showing front and one side, identical face and shoulders. Cream background, navy outlines, green shirt, flat shading, no text, logos, accessories, tools or facial hair. Square composition. Hairstyle: '
prompts={}
for h in catalog:prompts[h['id']]=base+h['name']+'. '+h['barberBase']
qnames=['currentLength','texture','preferredLength','willingToGrow','stylingEffort','overallLook','sidesPreference','frontPreference']
for q in qnames:prompts['question-'+q]=base+'Supporting illustration for '+q+'. Use the same character. '+('Show four portraits with increasing top length, buzzed, short, medium, long.' if q in ['currentLength','preferredLength'] else 'Show four portraits with straight, wavy, curly, and coily natural hair.' if q=='texture' else 'Show clear hairstyle silhouettes relevant to this preference.')
prompts['hero']=base+'Welcome illustration with three portraits of the same boy wearing a crop, a curly top and curtains.'
Path('docs/illustration-prompts.md').write_text('# Illustration prompt catalog\n\nGenerated artwork must be reviewed against cut definitions. Each prompt is individually editable.\n\n'+'\n\n'.join('## '+k+'\n\n'+v for k,v in prompts.items()))
Path('docs/illustration-prompts.json').write_text(json.dumps(prompts,indent=2))
# Paths share the exact same face and neck; silhouettes encode individual cut identities.
paths=[
'M89 126Q84 65 156 64Q222 66 229 126L216 110Q155 84 103 114Z',
'M87 124Q82 59 156 57Q223 59 231 125L216 106Q158 76 102 108Z',
'M87 139L88 79Q123 43 181 58L228 94V139L212 104Q177 70 106 95L102 139Z',
'M86 140L86 76Q148 37 223 67L231 139L213 98Q165 73 106 104L102 140Z',
'M93 138V83Q153 58 220 85V138L209 96H106V138Z',
'M85 143V78Q157 48 230 78V141L214 110H102L101 143Z',
'M86 140V72Q157 35 232 76V141L215 116L102 116L100 141Z',
'M86 141L83 82L100 67L112 70L126 53L140 63L155 49L168 60L183 51L197 66L216 63L233 86L230 142L213 111L198 116L183 108L165 119L150 110L133 119L116 110L103 121L100 141Z',
'M86 140L89 82L103 40L120 67L143 35L157 66L179 39L187 71L210 53L229 97L230 140L214 103L103 104L101 141Z',
'M86 142L84 83Q121 40 185 55Q221 64 231 91V141L214 105Q194 91 177 74Q149 95 104 112L100 142Z',
'M86 142L86 79Q114 32 184 43Q223 48 231 92V141L215 104Q178 73 104 111L101 142Z',
'M86 142L86 76Q88 33 126 29Q172 21 216 62L231 99V141L214 105Q174 71 104 99L101 142Z',
'M86 141V72Q81 15 144 18Q211 15 228 74L231 141L215 104Q164 62 104 101L101 141Z',
'M86 142V81Q90 31 159 37Q221 39 231 87V141L215 103Q176 65 105 101L101 142Z',
'M93 145L89 65Q162 33 231 65L227 145L210 93L107 93L106 145Z',
'M89 143L95 91L126 70L157 35L185 69L225 95L229 144L211 107L159 80L108 108L103 143Z',
'M99 147V100L130 78L141 39L159 23L176 40L188 81L220 107V146L205 112L178 108L157 66L138 108L113 113L111 147Z',
'M83 146L80 76L108 58L125 64L143 51L166 59L185 49L208 65L229 65L236 95L229 146L213 120L196 140L177 121L160 145L142 126L123 144L106 120L100 146Z',
'M83 148V78Q140 34 214 61L235 92L227 145L211 105Q184 106 147 135L112 158L118 124L103 146Z',
'M78 178L78 88Q87 38 153 52Q220 38 239 86L242 176L214 158L199 100L159 72L118 106L105 163Z',
'M75 163L74 91Q82 34 155 42Q230 34 241 91L239 164L220 145L205 127Q154 152 109 128L96 153Z',
'M68 235L76 109Q75 45 156 41Q231 42 241 105L254 235L215 217L211 106L169 75L116 99L107 216Z',
'M64 242L77 106L85 66L113 43L141 53L163 35L187 54L217 50L237 90L253 241L222 219L217 238L196 199L207 122L183 113L162 129L142 113L111 130L112 199L90 234L89 217Z',
'M66 243L80 90L89 52L122 31L153 44L181 30L213 47L234 85L251 243L218 220L207 234L202 133L184 123L162 144L139 123L114 137L111 226L90 235Z',
'M83 241L87 84L113 60L145 68L161 49L187 67L220 74L230 105L235 242L210 225L203 121L107 114L109 221Z',
'M76 151V86Q80 38 158 40Q235 38 241 86V151L220 142L215 115H102L99 142Z',
'M65 241L73 101Q75 36 153 40Q232 29 243 106L257 241L220 229L207 185L211 112L184 85L159 73L129 95L107 127L108 193L93 229Z',
'M78 195L78 92Q84 42 157 49Q224 45 239 92L240 195L216 176L211 117L178 88L157 96L127 88L108 119L104 177Z',
]
def curlpath(top=59,bottom=116,left=84,right=231,rounding=False):
 return f'M{left} 143V{top+34}Q{left-7} {top-3} 116 {top}Q129 {top-20} 153 {top-9}Q179 {top-24} 195 {top}Q{right+8} {top-4} {right} {top+34}V143L213 {bottom}Q155 {bottom+18} 103 {bottom}L101 143Z'
paths += [curlpath(57,115),curlpath(16,103),curlpath(42,114),curlpath(60,104,82,234),curlpath(8,101,55,258),curlpath(30,108,81,233),'M88 142V43H230V142L213 102H105L102 142Z', 'M101 144V93L125 64L136 29Q160 0 182 29L194 64L221 96V144L205 116L184 106L160 66L136 106L116 116L112 144Z',paths[0],curlpath(39,112)]
def portrait(index,texture=None):
 hair=paths[index]; lines=''
 if index in [0,1,4,36]:
  for y in range(80,110,9):
   for x in range(110,211,12):lines+=f'<path d="M{x} {y}l2 2" stroke="#59605b" stroke-width="2"/>'
 if index in [28,29,30,31,32,33,35,37] or texture in ['curly','coily']:
  for j in range(15 if index!=37 else 10):
   x=100+(j%5)*26;y=(52 if index in [29,32] else 72)+(j//5)*17
   if index==37:lines+=f'<path d="M{x} 108q-6-22 0-48q9 14 0 48" stroke="#59605b" fill="none" stroke-width="5"/>'
   else:lines+=f'<path d="M{x} {y}q-10-13 0-17q13 1 7 13" fill="none" stroke="#56605a" stroke-width="3"/>'
 if index==36:
  lines=''.join(f'<path d="M105 {y}Q157 {y-26} 214 {y}" stroke="#62675d" stroke-width="3" fill="none"/>' for y in range(83,115,8))
 face='<path d="M60 320Q62 256 137 245L183 245Q256 256 265 320" fill="#305e50"/><path d="M137 219V254Q160 277 183 254V219" fill="#b77b57"/><ellipse cx="98" cy="162" rx="13" ry="21" fill="#c58a64"/><ellipse cx="224" cy="162" rx="11" ry="20" fill="#b87a54"/><path d="M99 117Q152 77 218 119L218 180Q211 232 167 242Q117 235 103 194Z" fill="#ce9671"/><path d="M190 128Q221 149 211 195Q204 221 168 238Q212 232 218 180V119Z" fill="#c18962"/><path d="M118 150q10-5 21 0m42-2q11-5 20 1" stroke="#293538" fill="none" stroke-width="4" stroke-linecap="round"/><ellipse cx="131" cy="163" rx="3" ry="4" fill="#1e2c33"/><ellipse cx="192" cy="161" rx="3" ry="4" fill="#1e2c33"/><path d="M161 166l-4 17h10" stroke="#a96f4e" fill="none" stroke-width="3" stroke-linecap="round"/><path d="M148 205q17 9 32-3" stroke="#7e503e" fill="none" stroke-width="3" stroke-linecap="round"/><path d="M127 259q32 29 65-1" stroke="#203f37" stroke-width="5" fill="none"/>'
 return face+f'<path d="{hair}" fill="#243039" stroke="#243039" stroke-width="3" stroke-linejoin="round"/>'+lines

def svg(body):return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">'+body+'</svg>'
for i,h in enumerate(catalog):Path('public/illustrations/'+h['id']+'.svg').write_text(svg(portrait(i)))
# Composed diagrams contain labels for reference order, rendered as vector text offline.
def montage(indices,labels):
 n=len(indices);body=''
 for j,(idx,label) in enumerate(zip(indices,labels)):
  if n==4:x=(j%2)*158;y=(j//2)*158;scale=.47
  else:x=j*102;y=65 if j!=1 else 30;scale=.38
  body+=f'<g transform="translate({x},{y}) scale({scale})">'+portrait(idx)+'</g>'
  if n==4:body+=f'<text x="{x+76}" y="{y+152}" text-anchor="middle" fill="#305e50" font-family="Arial,sans-serif" font-size="10">{html.escape(label)}</text>'
 return body
Path('public/illustrations/hero.svg').write_text(svg(montage([7,30,19],[] if False else ['','',''])))
for q in qnames:
 body=montage([0,2,17,21],['Buzzed','Short','Medium','Long']) if q in ['currentLength','preferredLength'] else montage([9,26,30,32],['Straight','Wavy','Curly','Coily']) if q=='texture' else montage([2,7,15],['','','']) if q=='overallLook' else montage([27,33,14],['','','']) if q=='sidesPreference' else montage([17,11,19],['','','']) if q=='frontPreference' else montage([0,21,26],['','','']) if q=='willingToGrow' else montage([2,7,12],['','',''])
 Path('public/illustrations/question-'+q+'.svg').write_text(svg(body))
