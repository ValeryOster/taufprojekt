<?php
require_once( 'fpdf.php' );
require_once( 'fpdi/autoload.php' );

class CreatePDFFromTamplate {
	private $pdf = null;


	public function __construct() {
		$this->pdf = new \setasign\Fpdi\Fpdi();
		$this->pdf->AddPage();
	}

	public function createPDFFromTamplate( $date ) {
		try {
			$this->pdf->setSourceFile( 'Vorlage.pdf' );
			$tplIdx = $this->pdf->importPage( 1 );
			$this->pdf->useTemplate( $tplIdx, 0, 0, 297, 210, true );

			$this->pdf->SetFont( 'Arial', '', 10 );
			$this->pdf->SetTextColor( 0, 0, 0 );

			foreach ( $date as $key => $value ) {
				if(!empty($value)) {
					switch ( $key ) {
						//***Kind***
						case "vornameKind"://Vorname
							$this->setXYText( 90, 77, $value );
							break;
						case "nameKind"://Nachname
							$this->setXYText( 90, 82, $value );
							break;
						case "dateKind"://Geburtsdatum
							$this->setXYText( 90, 87, $value );
							break;
						case "geburstortKind":
							$this->setXYText( 90, 92, $value );
							break;
						//*** NamesTag
						case "dateNamestag"://Tag
							$this->setXYText( 90, 105, $value );
							break;
						case "feiertagNamestag":// Beschreibung
							$this->setXYText( 90, 110, $value );
							break;
//*** Vater von Taufkind ***
						case "vornameVater":
							$this->setXYText( 90, 123, $value );
							break;
						case "nameVater":
							$this->setXYText( 90, 128, $value );
							break;
						case "dateVater":
							$this->setXYText( 90, 133, $value );
							break;
						case "geburstortVater":
							$this->setXYText( 90, 138, $value );
							break;

//*** Mutter von Taufkind ***
						case "vornameMutter":
							$this->setXYText( 90, 153, $value );
							break;
						case "nameMutter":
							$this->setXYText( 90, 158, $value );
							break;
						case "dateMutter":
							$this->setXYText( 90, 163, $value );
							break;
						case "geburstortMutter":
							$this->setXYText( 90, 168, $value );
							break;
//*** Taufpate ***
						case "vornameTaufpate":
							$this->setXYText( 190, 51, $value );
							break;
						case "nameTaufpate":
							$this->setXYText( 190, 56, $value );
							break;
						case "dateTaufpate":
							$this->setXYText( 190, 61, $value );
							break;
						case "geburstortTaufpate":
							$this->setXYText( 190, 66, $value );
							break;
//*** Taufpatin ***
						case "vornameTaufpatin":
							$this->setXYText( 190, 82, $value );
							break;
						case "nameTaufpatin":
							$this->setXYText( 190, 87, $value );
							break;
						case "dateTaufpatin":
							$this->setXYText( 190, 92, $value );
							break;
						case "geburstortTaufpatin":
							$this->setXYText( 190, 97, $value );
							break;

						default:;
					}
				}
			}

			//*** Datum ***
			$this->pdf->SetXY( 170, 164 );
			$this->pdf->Write( 0, '21.01.2023' );


			//*** Register Nummer ***
			$this->pdf->SetFont( 'Arial', 'B', 14 );
			$this->pdf->SetXY( 201, 137.3 );

			$str = "register.txt";
			$fp = fopen( $str, "w" ) or die( "Unable to open file!" );
			$value = 0;
			if ( filesize( $str ) > 0 ) {
				$contents = fread( $fp, filesize( $str ) );
				$value    = trim( file_get_contents( $fp ) );
			} else {
				$value = 1;
			}
			$this->pdf->Write( 0, $value );
			fwrite( $fp, $value ++ );
			fclose( $fp );

		} catch
		( \setasign\Fpdi\PdfParser\PdfParserException|\setasign\Fpdi\PdfReader\PdfReaderException $e ) {
		}

		$this->pdf->Output();
	}


	/**
	 * @return void
	 */
	public function setXYText( $x, $y, $text ): void {
		$this->pdf->SetXY( $x, $y );
		$this->pdf->Write( 0, $text );
	}
}