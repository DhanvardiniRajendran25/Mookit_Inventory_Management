<Router>
      <div>
        <Navbar />
        <main style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/addEvent" element={<AddEvent />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/addInvestigation" element={<AddInvestigation />} />
            <Route path="/viewInvestigation" element={<ViewInvestigation />} />
            <Route path="/eventupdate/:id" element={<EventUpdate />} />
            <Route path="/invupdate/:id" element={<InvestigationUpdate />} />
            <Route path="/invview/:id" element={<InvestigationDetails />} />
            <Route path="/Persondisplay" element={<Persondisplay />} />
            <Route path="/Personcreate" element={<Personcreate />} />
            <Route path="/Personupdate/:id" element={<Personupdate />} />
            <Route path="/Personview/:id" element={<Personview />} />
            <Route path="/Responsecreate" element={<Responsecreate />} />
            <Route path="/Responsedisplay" element={<Responsedisplay />} />
            <Route path="/Responseupdate/:id" element={<Responseupdate />} />
            <Route path="/Responseview/:id" element={<Responseview />} />
            <Route path="/Feedbackcreate" element={<Feedbackcreate />} />
            <Route path="/Feedbackdisplay" element={<Feedbackdisplay />} />
            <Route path="/Feedbackupdate/:id" element={<Feedbackupdate />} />
            <Route path="/Feedbackview/:id" element={<Feedbackview />} />
            {/* Add more routes for other pages */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>