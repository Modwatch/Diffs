import test from "ava";
import { diffModFile, patchModFile } from "../src/index";
import files from "../modfiles/index";

const modfiles = [{
	files: ["Skyrim.ini", "SkyrimPrefs.ini"],
	filetypes: ["skyrimini", "skyrimprefsini"],
	dir: "skyrim"
}, {
	files: ["Fallout4.ini", "Fallout4Prefs.ini"],
	filetypes: ["fallout4ini", "fallout4prefsini"],
	dir: "fallout4"
}, {
	files: ["Fallout.ini", "FalloutPrefs.ini"],
	filetypes: ["falloutnvini", "falloutnvprefsini"],
	dir: "falloutnv"
}, {
	files: ["Fallout.ini", "FalloutPrefs.ini"],
	filetypes: ["fallout3ini", "fallout3prefsini"],
	dir: "fallout3"
}];

for(let i = 0; i < modfiles.length; i++) {
	for(let j = 0; j < modfiles[i].files.length; j++) {
		test(`diffModFile: ${modfiles[i].files[j]}`, async t => {
			const modfile = Promise.resolve({
				content: files[modfiles[i].filetypes[j]]
			})
			.then(obj => diffModFile({
		      content: obj.content.slice(2),
		      filetype: modfiles[i].filetypes[j]
		    })
		    .then(delta => patchModFile({
		      delta,
		      filetype: modfiles[i].filetypes[j]
		    }))
		    .then(patched => patched
		      .map((line, index) =>
		        line === obj.content[index]
		      )
		      .reduce((prev, curr) => curr && prev === curr)
		    )
		  )
			t.true(await modfile);
		});
	}
}
