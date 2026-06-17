
// This is not part of pulse yet. Still in development. 

if(!window.axe){

var script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/axe-core@4.11.2/axe.min.js';
script.onload = runAxe;
document.head.appendChild(script);
} else { runAxe(); }

function runAxe(){
axe.run(document, { runOnly: ['wcag2a', 'wcag2aa'] })
.then(results => {
if(results.violations.length === 0){
console.log('✅ No accessibility violations found!');
alert('No accessibility violations found!');
return;
}

console.log('⚠️ Accessibility Violations:', results.violations);

// Optional: Format nicely in the console
results.violations.forEach(v => {
console.group(`Rule: ${v.id} (${v.impact})`);
console.log('Description:', v.description);
console.log('Help:', v.help);
console.log('Nodes:');
v.nodes.forEach(n => {
console.log('  Target:', n.target.join(', '));
if(n.failureSummary) console.log('  Failure Summary:', n.failureSummary);
});
console.groupEnd();
});

alert(`Accessibility scan complete! Found ${results.violations.length} violations. Check console.`);
})
.catch(err => {
console.error('Axe error:', err);
alert('Axe-core error! See console.');
});
}