class Listener {
  constructor(notesService, mailsender) {
    this._notesService = notesService;
    this._mailsender = mailsender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString());

      const notes = await this._notesService.getNotes(userId);
      const result = await this._mailsender.sendMail(targetEmail, JSON.stringify(notes));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
