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

REM Permalinks

xcopy /y _includes\permalink.html ..\a11y\_includes\
xcopy /y _includes\permalink.html ..\component-library\_includes\
xcopy /y _includes\permalink.html ..\playground\_includes\
xcopy /y _includes\permalink.html ..\radancyco.github.io\_includes\
xcopy /y _includes\permalink.html ..\career-path-generator\_includes\
xcopy /y _includes\permalink.html ..\tb-ajd-template\_includes\
xcopy /y _includes\permalink.html ..\tmp-custom-imports\_includes\
xcopy /y _includes\permalink.html ..\magicbullet\_includes\

REM Components (For Navigation)

xcopy /y _data\module.yml ..\a11y\_data\
xcopy /y _data\module.yml ..\component-library\_data\
xcopy /y _data\module.yml ..\playground\_data\
xcopy /y _data\module.yml ..\radancyco.github.io\_data\
xcopy /y _data\module.yml ..\career-path-generator\_data\
xcopy /y _data\module.yml ..\tb-ajd-template\_data\
xcopy /y _data\module.yml ..\tmp-custom-imports\_data\
xcopy /y _data\module.yml ..\magicbullet\_data\