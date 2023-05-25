export default class ProjectionSlides {
  private pages: string[][] = [];
  private canvas: HTMLCanvasElement = document.createElement('canvas');
  private isSetup = false;
  private currentPage = 0;

  private characterLength: number = 17 * 3;
  private characterHeight: number = 30 * 3;
  private newLineSpace: number = 6 * 3;
  private charPerLine = 30;
  private horizontalTextStart = 75;

  public getCanvasDimensions() {
    return {
      x: this.canvas.width,
      y: this.canvas.height,
    };
  }

  // draws the page with the current page index
  public drawCurrentPage() {
    if (this.isSetup) {
      this.writeLinesToCavas(this.pages[this.currentPage]);
    } else {
      console.warn('cant draw projector slide, since projection isnt set up');
    }
  }

  // check if there is a next page
  public hasNextPage() {
    return this.currentPage + 1 < this.pages.length;
  }

  // increment page if there is a next one
  public loadNextPage() {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.drawCurrentPage();
      return true;
    } else {
      return false;
    }
  }

  public setupProjectionMultiplePages(text: string) {
    console.warn('function still needs to be implemented');
    this.setupProjectorSlides([text.slice(0, 50), 'Slide 2']);
  }

  // porjector gets setup to fit whole text on one page
  public setupProjectionOnePage(text: string) {
    const lines = this.splitStringIntoLines(text);
    this.setCanvasSizeForTextSegment(lines.length);
    this.pages[0] = lines;
    this.isSetup = true;
  }

  // projector gets setup slide by slide
  public setupProjectorSlides(slides: string[]) {
    let largestLineAmount = 0;
    slides.forEach((element) => {
      const linesOfSingleSlide = this.splitStringIntoLines(element);
      this.pages.push(linesOfSingleSlide);
      if (linesOfSingleSlide.length > largestLineAmount) {
        largestLineAmount = linesOfSingleSlide.length;
      }
    });
    this.setCanvasSizeForTextSegment(largestLineAmount);
    this.isSetup = true;
  }

  // projector is setup line by line
  public setupPorjectorLineByLine(lines: string[]) {
    this.pages[0] = lines;
    this.setCanvasSizeForTextSegment(lines.length);
    this.isSetup = true;
  }

  private splitStringIntoLines(text: string) {
    const words = text.split(' ');

    const lines = [];

    let currentLine = '';
    words.forEach((word) => {
      if (currentLine.length + word.length < this.charPerLine) {
        currentLine = currentLine + word + ' ';
      } else {
        lines.push(currentLine);
        currentLine = word + ' ';
      }
    });

    if (currentLine !== '' && currentLine !== ' ') {
      lines.push(currentLine);
    }

    return lines;
  }

  private setCanvasSizeForTextSegment(linesOfSegment: number) {
    this.canvas.width = this.characterLength * this.charPerLine;
    this.canvas.height = (linesOfSegment + 1) * (this.characterHeight + this.newLineSpace);
  }

  private writeLinesToCavas(lines: string[]) {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const x = this.horizontalTextStart;
    let y = (this.newLineSpace + this.characterHeight) * 1.25;

    ctx.font = this.characterHeight + 'px Montserrat';
    ctx.fillStyle = '#000';

    lines.forEach((line) => {
      ctx.fillText(line, x, y);
      y += this.characterHeight + this.newLineSpace;
    });
  }

  public get cavas(): HTMLCanvasElement {
    return this.canvas;
  }
}
