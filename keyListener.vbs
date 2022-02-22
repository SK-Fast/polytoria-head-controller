Set WshShell = WScript.CreateObject("WScript.Shell")

Do While True
WScript.Sleep 10
Set objFileToRead = CreateObject("Scripting.FileSystemObject").OpenTextFile("D:\bots\obbywithmyhead\key.txt",1)
If objFileToRead.AtEndOfStream Then
Else
strFileText = objFileToRead.ReadAll()
objFileToRead.Close
Set objFileToRead = Nothing

If strFileText = "None" Then
Else
Dim x
x=0
Do While x<20
WshShell.SendKeys strFileText
x=x+1
WScript.Sleep 10
Loop
End If
End If

Loop