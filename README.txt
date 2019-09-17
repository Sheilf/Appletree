/# Appletree

Inside /app/src

index.js contains global nav & routes

Components:

in index.js
<Nav>  //Global component
  Routes to{
    /
    /upload
    /library
    /login
    /dashboard
    /contact
  }
</Nav>

in ROUTE /
<App> 
  <Landing /> renders <HeaderWithSearch /> routes to /search/:searchTerm
  <Landing /> renders <RowOfImages />
  <Landing /> renders <BigButtons />
</App>

in ROUTE /login
<Login>
  <FirebaseAuthUI />
</Login>

in ROUTE /upload
<Upload>

  <Autofill>
    <header/>
    <instructions/>
    <...TextField, TextField, SelectField, SelectField, TextArea/>
  </Autofill>
  
  <FormFailureMessage />
  <...TextField, TextField, TextField, SelectField, SelectField, TextArea />
  
  <UploadFile>
    <ProgressBar />
    <SuccessMessage />
  </UploadFile>
  
  <UploadFile>
    <ProgressBar />
    <SuccessMessage />
  </UploadFile>
  
</Upload>


in ROUTE /library
<Library>
  <...TextField, RadioForm, SelectField, buttons />
  <LibraryList>
    <...LibraryItem /> routes to /library/:document
  </LibraryList>
</Library>

in ROUTE /library/:document
<DocumentDownload>
  <content> routes to /profile/:profileUserID
  <star>
  <download> 
  <LibraryItem />
</DocumentDownload>

in ROUTE /profile/:profileUserID
<Profile>
  <photo>
  <uploads created by profile's userid /> routes to /library/:document
</Profile>

in ROUTE /dashboard
<Dashboard>
  <buttons>
  <render uploaded LibraryItems />
  <render starred LibraryItems />
</Dashboard>





