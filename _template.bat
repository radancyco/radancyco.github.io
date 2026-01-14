REM Running batch to copy files over to other project directories...

REM Layout

xcopy /y _layouts\default.html ..\a11y\_layouts\
xcopy /y _layouts\default.html ..\component-library\_layouts\
xcopy /y _layouts\default.html ..\playground\_layouts\
xcopy /y _layouts\default.html ..\radancyco.github.io\_layouts\
xcopy /y _layouts\default.html ..\career-path-generator\_layouts\
xcopy /y _layouts\default.html ..\tb-ajd-template\_layouts\
xcopy /y _layouts\default.html ..\tmp-custom-imports\_layouts\
xcopy /y _layouts\default.html ..\magicbullet\_layouts\

REM Template

xcopy /y _includes\template.html ..\a11y\_includes\
xcopy /y _includes\template.html ..\component-library\_includes\
xcopy /y _includes\template.html ..\playground\_includes\
xcopy /y _includes\template.html ..\radancyco.github.io\_includes\
xcopy /y _includes\template.html ..\career-path-generator\_includes\
xcopy /y _includes\template.html ..\tb-ajd-template\_includes\
xcopy /y _includes\template.html ..\tmp-custom-imports\_includes\
xcopy /y _includes\template.html ..\magicbullet\_includes\

REM Icon

xcopy /y _includes\icon.html ..\a11y\_includes\
xcopy /y _includes\icon.html ..\component-library\_includes\
xcopy /y _includes\icon.html ..\playground\_includes\
xcopy /y _includes\icon.html ..\radancyco.github.io\_includes\
xcopy /y _includes\icon.html ..\career-path-generator\_includes\
xcopy /y _includes\icon.html ..\tb-ajd-template\_includes\
xcopy /y _includes\icon.html ..\tmp-custom-imports\_includes\
xcopy /y _includes\icon.html ..\magicbullet\_includes\
